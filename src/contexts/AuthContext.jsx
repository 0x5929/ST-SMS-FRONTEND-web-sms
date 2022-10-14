import { useState, createContext, useContext, useEffect, useCallback } from "react"
import { useToggle } from '../hooks'

const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {

    const [ authed, setAuthed ] = useToggle(false)
    const [ user, setUser ] = useState(null)

    // login/out functionalities
    const login = (creds) => {
        // do api calls and check for credentials
        return new Promise((res) => {
            setUser(creds)
            setAuthed(true)
            res()
            console.log('logged in with: ', creds)
        })

    }
        
    const logout = () => {
        return new Promise((res) => {
            setUser(null)
            setAuthed(false)
            res()
            console.log('logged out')
        });
    }

    useEffect(() => {
        setAuthed(JSON.parse(localStorage.getItem('authed')))
        setUser(JSON.parse(localStorage.getItem('user')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem('authed', JSON.stringify(authed))
        localStorage.setItem('user', JSON.stringify(user))
    }, [authed, user])

    return (
        <AuthContext.Provider
            value={{
                authed,
                user,
                login,
                logout,
                setUser,
                setAuthed
            }}
        >
            { children }
        </AuthContext.Provider>
    )
    
}


export const useAuthContext = () => useContext(AuthContext);
export default AuthContextProvider;
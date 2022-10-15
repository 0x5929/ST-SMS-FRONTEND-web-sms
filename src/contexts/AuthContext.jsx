import { useState, createContext, useContext, useEffect } from "react"

import Components from "../components"
import { useToggle, useNotification } from '../hooks'
import * as axioService from '../services/api/djREST'

const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {

    const [ authed, setAuthed ] = useToggle(false)
    const [ user, setUser ] = useState(null)
    const [notify, notificationHandlers] = useNotification(Components.NotificationSlide)

    // login/out functionalities
    const login = async (creds) => {
        // do api calls and check for credentials

        try {
            const response = await axioService.authenticationPOST(creds)
            const accessToken = response?.data?.access_token

            setAuthed(true)
            setUser({ user: creds.email, accessToken: accessToken })
            console.log('logged in with: ', creds.email)
        }
        catch(err) {
            setAuthed(false)
            setUser(null)
            console.error(err)
            notificationHandlers.handleOpenNotification('Error: incorrect login credentials', 'error')
            
        }



        // return new Promise((res) => {
        //     setUser(creds)
        //     setAuthed(true)
        //     res()
        // })

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
            <Components.Notification 
                notify={notify}
                notificationHandlers={notificationHandlers}
            />
        </AuthContext.Provider>
    )
    
}


export const useAuthContext = () => useContext(AuthContext);
export default AuthContextProvider;
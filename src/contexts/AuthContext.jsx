import { useState, createContext, useContext } from "react"

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
            const data = await axioService.authenticationPOST(creds)
            const accessToken = data.access_token

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


    }
        
    const logout = async () => {

        try {
            const response = await axioService.logoutPOST()
            console.log('logout response: ', response)
        }
        catch(err) {
            console.error(err)
        }
        finally {
            
            setUser(null)
            setAuthed(false)
            console.log('logged out')
        }
    }


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
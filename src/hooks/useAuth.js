import { useState, createContext } from "react";

export default function useAuth () {
    
    const AuthContext = createContext(null)

    const [ authed, setAuthed ] = useState(false)
    const [ user, setUser ] = useState(null)

    // login/out functionalities
    const login = (creds) => {
        return new Promise((res) => {
            // api call to authenticate the creds, 
            // should return user obj
            // setUser with  user obj
            setUser(creds.email)
            setAuthed(true)
            res()
        });
    }
      
    const logout = () => {
        return new Promise((res) => {
            setUser(null)
            setAuthed(false)
            res()
        });
    }

    return {
        AuthContext,
        authed,
        user,
        login,
        logout
    }
}
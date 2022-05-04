import { useState, createContext } from "react";

export default function useAuth () {
    
    const AuthContext = createContext(null)


    const [ authed, setAuthed ] = useState(false)
    const [ user, setUser ] = useState("")




    // login/out functionalities
    const login = (creds) => {
        // do api calls and check for credentials
        console.log(creds)
        setUser(creds)
        setAuthed(true)
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
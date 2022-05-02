import { useState, createContext, useContext } from "react";


export default function useLogin () {

    const AuthContext = createContext(null)
    const [ user, setUser ] = useState(null)

    const useAuth = () => {
        return useContext(AuthContext)
    }

    // login form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    };


    // login/out functionalities
    const login = (user) => {
        setUser(user)
    }
      
    const logout = () => {
        setUser(null)
    }

        return {
            handleSubmit,
            AuthContext,
            login,
            logout,
            user,
            setUser,
            useAuth
        }
}
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin (AuthContext) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const { 
        authed,
        user
    } = auth

    useEffect(()=>{
        if (authed) {
            navigate('/')
        }
        console.log('user logged in: ', user)
    }, [authed, user, navigate])


    // this will replace handleSubmit 
    const handleLogin = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        auth.login(data.get('email'))
    }

    // login form submit


        return {

            handleLogin,

        }
}
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
            navigate('/query')
        }
        else {
            navigate('/')
        }
    }, [authed, user, navigate])


    // this will replace handleSubmit 
    const handleLogin = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        auth.login({email: data.get('email'), password: data.get('password')})
    }

        return {

            handleLogin,

        }
}
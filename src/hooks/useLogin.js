import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validate from './useValidation'

export default function useLogin (AuthContext) {
    const [ creds, setCreds ] = useState({email: '', password: ''})
    const [ errors, setErrors ] = useState({})
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const { 
        authed,
        user
    } = auth

    useEffect(()=>{

        setCreds({
            email: !user ? '' : user.email, 
            password: !user ? '' : user.password
        })

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
        if (validate.useLoginValidation(creds, setErrors, errors)){
            auth.login({email: creds.email, password: creds.password})
        }
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target
        setCreds({
            ...creds,
            [name] : value
        })

    }

    const handleClearText = (name) => {
        setErrors({
            ...errors,
            [name] : ''
        })
        setCreds({
            ...creds,
            [name] : ''
        });

    }

    return {
        creds,
        errors,
        handleLogin,
        handleOnChange,
        handleClearText,
     }
}
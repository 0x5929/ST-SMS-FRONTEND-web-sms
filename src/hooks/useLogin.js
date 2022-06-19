import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useValidations from './useValidations'

export default function useLogin ({ authed, user, login }) {
    const [ creds, setCreds ] = useState({email: '', password: ''})
    const [ errors, setErrors ] = useState({})
    const { loginValidation } = useValidations()

    const navigate = useNavigate()

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
    const handleLogin = useCallback((event) => {

        event.preventDefault();
        if (loginValidation(creds, setErrors, errors)){
            login({email: creds.email, password: creds.password})
        }
    }, [creds, errors, login, loginValidation])


    const handleOnChange = useCallback((event) => {
        const { name, value } = event.target
        setCreds({
            ...creds,
            [name] : value
        })

    }, [creds])

    const handleClearText = useCallback((name) => {
        setErrors({
            ...errors,
            [name] : ''
        })
        setCreds({
            ...creds,
            [name] : ''
        });

    }, [creds, errors])

    const loginStates = { creds, errors }
    const loginHandlers = { handleLogin, handleOnChange, handleClearText }

    return [ loginStates, loginHandlers ]
}
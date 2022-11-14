import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axio  from '../services/api/axios'
import { useRefreshToken } from './index'
import { useAuthContext } from '../contexts'



const useAuthedAxios  = () => {
    const navigate = useNavigate()
    const refresh = useRefreshToken()
    const { user } = useAuthContext()

    useEffect(() => {

        const requestIntercept = axio.interceptors.request.use(
            config => {

                // first attempt in auth request, authorization header not set yet
                // check if access_token is already in user state
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`
                }

                if (!config.headers['Content-Type']) {
                    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
                }

                return config
            },

            error => Promise.reject(error)

        )


        const responseIntercept = axio.interceptors.response.use(
            response => response,

            // response with errors (dealing with errors)
            async (error) => {

                
                const prevRequest = error?.config

                // if response error is within 400s, see to that we resend it after trying to refresh 
                // with our refresh token http only cookie
                if ( (error?.response.status === 400 || error?.response.status === 403)
                    && (!prevRequest?.sent) ) {
                        
                    prevRequest.sent = true

                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`       
                    return axio(prevRequest)
                
      
                }
                // if refresh() above came back not refreshed, and bc no valid refresh token is found, redirect to sign in
                // also needed so the above condition doesnt go into infinite loop, care when refactoring
                else if (error?.response?.data?.detail === 'No valid refresh token found.') {

                    return Promise.reject(error).then(()=>{}, (error) => {
                        console.error(error)
    
                        // since it is a protected route, it will refresh tokens and load, if not 
                        // user will be set to null and / sign in will be rendered (from useEffect login inside useSigninForm())

                        navigate('/')
                    })
                }
                else {
                    navigate('/')
                }
            }
        )

        // cleanup all interceptors
        return () => {
            axio.interceptors.request.eject(requestIntercept)
            axio.interceptors.response.eject(responseIntercept)
        }

    }, [user])

    // return this so other hook logic can use and request backend API
    return axio
}


export default useAuthedAxios
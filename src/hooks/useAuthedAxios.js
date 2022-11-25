import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import axio  from '../services/api/axios'
import { useRefreshToken } from './index'
import { useAuthContext } from '../contexts'



const useAuthedAxios  = () => {
    const mountedRef = useRef(true)
    const navigate = useNavigate()
    const refresh = useRefreshToken()
    const { user, setUser, setAuthed } = useAuthContext()


    // on component dismount, set mountRef to be false, so that all api calls are not set as state
    useEffect(() => {

        return () => {
            mountedRef.current = false
        }
    }, [])



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
                const prevRequest = error.config

                // only if we have an expired accessCode, refresh, overwise, pass on the error
                if ( (error?.response?.data?.detail === 'Given token not valid for any token type')
                    && (!prevRequest?.sent) ) {
                    

                    try {

                        const newAccessToken = await refresh()
                        if (!mountedRef.current) return null
                        setAuthed(true)
                        setUser(prev => {
                            return { ...prev, accessToken: newAccessToken }
                        })


                        return axio({
                            ...prevRequest, 
                            headers: {
                                ...prevRequest.headers.toJSON(),
                                Authorization: `Bearer ${newAccessToken}`
                            },
                            sent: true
                        })

                    }
                    catch (err) {
                        console.error('[!] Authenticated http request instance error: ', err)
            
                        if (!mountedRef.current) return null
                        setAuthed(false)
                        setUser(null)
                        
                        navigate('/')
                        return Promise.reject(error)
                    }         
      
                }
   
                else {
                    return Promise.reject(error)
                }
            }
        )

        // cleanup all interceptors
        return () => {
            axio.interceptors.request.eject(requestIntercept)
            axio.interceptors.response.eject(responseIntercept)
        }

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // return this so other hook logic can use and request backend API
    return axio
}


export default useAuthedAxios
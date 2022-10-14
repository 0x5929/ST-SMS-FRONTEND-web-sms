import { useEffect } from 'react'

import { axiosWithIntercept } from '../services/api/axios'
import { useRefreshToken } from './index'
import { useAuthContext } from '../contexts'



const useAxiosWithIntercept  = () => {
    const refresh = useRefreshToken()
    const { user } = useAuthContext()

    useEffect(() => {

        const requestIntercept = axiosWithIntercept.interceptors.request.use(
            config => {

                // first attempt in auth request, authorization header not set yet
                // check if access_token is already in user state
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`
                }

                return config
            },

            error => Promise.reject(error)

        )


        const responseIntercept = axiosWithIntercept.interceptors.response.use(
            response => response,

            // response with error (403?)
            async (error) => {
                const prevRequest = error?.config

                // once request is sent again with refresh token, set set to true
                // avoid endless loop of request and responses due to 403
                if (error?.response.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`       
                    
                    // after adding new access token to the prevRequest, redo request again
                    return axiosWithIntercept(prevRequest)
                }

                return Promise.reject(error)
            }
        )

        // cleanup all interceptors
        return () => {
            axiosWithIntercept.interceptors.request.eject(requestIntercept)
            axiosWithIntercept.interceptors.response.eject(responseIntercept)
        }

    }, [user, refresh])

    // return this so other hook logic can use and request backend API
    return axiosWithIntercept
}


export default useAxiosWithIntercept
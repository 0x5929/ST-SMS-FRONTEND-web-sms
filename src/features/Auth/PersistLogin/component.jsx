import { useEffect } from 'react'

import { useToggle, useRefreshToken } from '../../../hooks'
import { useAuthContext } from '../../../contexts'

const PersistLogin = ({children}) => {
    const refresh = useRefreshToken()
    const [ isLoading, setIsLoading ] = useToggle(true)
    const { user, setUser, setAuthed  } = useAuthContext()

    // everytime persistLogin (routes protected by it) is visited, check following for refresh
    useEffect(() => {
        const refreshToken = async () => {
            try {
                // if successful, accesstoken will be set inside refresh()
                // change isLoading to false so children can render
                await refresh()
                setIsLoading(false)

            }catch(err) {
                console.error(err)

                // NOTE this will trigger an entire rerender for the AuthContext and everything within it
                // according to src/index's routing signin page will be re-rendered first, 
                // and since we did not get a new access toekn with an existing refresh token (due to logout or refresh token expired)
                // when we try to access any other protected private routes, we will be here again, setting user and Authed and routed back signin at /

                setUser(null)
                setAuthed(false)

            }
        }

        // if (!user?.accessToken) {
        //     refreshToken()
        // }
        // else {
        //     setIsLoading(false)
        //     // navigate to what it was from before?
        // }

        refreshToken()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {
                isLoading 
                    ? <div>circular progress</div> 
                    : children
            }
        </>
    )
}

export default PersistLogin

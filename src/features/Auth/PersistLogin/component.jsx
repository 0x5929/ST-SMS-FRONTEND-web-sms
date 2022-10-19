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
                await refresh()

            }catch(err) {
                // should we handle the setUser and setAuthed here? or should it be at the calling lvl?
                console.error(err)

                // NOTE this will trigger an entire rerender for the AuthContext and everything within it
                // meaning signin page will be re-rendered first, and since we cannot get a access toekn(due to logout or refresh token expired)
                // it will stay at the / login page. whereas if this wasnt a logout, ie just URL change
                // it should still have a refresh, and this will not hit, instead, user and authed will be set, and will trigger navigate inside signin form hook to navigate to /query
                setUser(null)
                setAuthed(false)

            }finally {

                setIsLoading(false)
            }      
        }

        if (!user?.accessToken) {
            refreshToken()
        }
        else {
            setIsLoading(false)
            // navigate to what it was from before?
        }

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

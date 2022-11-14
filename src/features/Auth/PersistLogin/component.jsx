import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToggle, useRefreshToken } from '../../../hooks'
import { useAuthContext } from '../../../contexts'

const PersistLogin = ({children}) => {
    const navigate  = useNavigate()
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
                console.log('ok this should have worked too')

            }catch(err) {
                console.error(err)

                // NOTE this will trigger an entire rerender for the AuthContext and everything within it
                // according to src/index's routing signin page will be re-rendered first, 
                // and since we did not get a new access toekn with an existing refresh token (due to logout or refresh token expired)
                // when we try to access any other protected private routes, we will be here again, setting user and Authed and routed back signin at /
                setUser(null)
                setAuthed(false)
                navigate('/')
            }finally {
                setIsLoading(false)
            }
        }

        // every page visit that is protected by this component will need to refresh and grab new accessToken
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

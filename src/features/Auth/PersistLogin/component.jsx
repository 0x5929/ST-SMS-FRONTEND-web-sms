import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToggle, useRefreshToken } from '../../../hooks'
import { useAuthContext } from '../../../contexts'

const PersistLogin = ({children}) => {
    const navigate  = useNavigate()
    const refresh = useRefreshToken()
    const mountedRef = useRef(true)
    const [ isLoading, setIsLoading ] = useToggle(true)
    const { setUser, setAuthed  } = useAuthContext()

    // on component dismount, set mountRef to be false, so that all api calls are not set as state

    // everytime persistLogin (routes protected by it) is visited, check following for refresh
    useEffect(() => {
        (async () => {
            try {
                const accessCode = await refresh()

                if (!mountedRef.current) return null
                setAuthed(true)
                setUser(prev => {
                    return { ...prev, accessToken: accessCode }
                })
        

            }catch(err) {
                if (!mountedRef.current) return null

                setUser(null)
                setAuthed(false)
                navigate('/')

            }finally {
                setIsLoading(false)
            }
        })()

        return () => {
            mountedRef.current = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {
                isLoading   
                    ? <div></div>
                    : children
            }
        </>
    )
}

export default PersistLogin

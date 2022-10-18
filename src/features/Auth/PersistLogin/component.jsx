import { useEffect } from 'react'

import { useToggle, useRefreshToken } from '../../../hooks'
import { useAuthContext } from '../../../contexts'

const PersistLogin = ({children}) => {
    const refresh = useRefreshToken()
    const [ isLoading, setIsLoading ] = useToggle(true)
    const { user, setUser, setAuthed,  } = useAuthContext()

    useEffect(() => {
        const refreshToken = async () => {
            try {
                await refresh()

                // setUser({ ...user, accessCode: newAccessCode })
                setAuthed(true)

            }catch(err) {
                console.error(err)
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
        }
       
       

    // just upon component mount, ie refresh
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
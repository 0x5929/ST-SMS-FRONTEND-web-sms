import * as axioService from '../services/api/djREST'
import { useAuthContext } from '../contexts/AuthContext'

const useRefreshToken = () => {

    const { setUser, setAuthed } = useAuthContext()

    const refresh = async () => {

        try {
            const data = await axioService.authRefreshGET()
    
            setAuthed(true)
            setUser(prev => {
                return { ...prev, accessToken: data.access }
            })
    
            return data.access

        }
        catch(err) {
            console.error(err)
            throw err
        }

    }

    return refresh

}

export default useRefreshToken
import axios from '../services/api/axios'
import { useAuthContext } from '../contexts/AuthContext'

const useRefreshToken = () => {

    const { setUser, setAuthed } = useAuthContext()

    const refresh = async () => {
        // backend todo: need to override get method inside the refresh view by creating our own 
        // and inherit the rest from refresh_view(), ie POST
        try {
            const response = await axios.get('auth/token/refresh/')
            console.log(response)
    
            setAuthed(true)
            setUser(prev => {
                return { ...prev, accessToken: response.data.access }
            })
    
            return response.data.access

        }
        catch(err) {
            console.error(err)
            throw err
        }

    }

    return refresh

}

export default useRefreshToken
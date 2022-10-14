import axios from '../services/api/axios'
import { useAuthContext } from '../contexts/AuthContext'

const useRefreshToken = () => {

    const { setUser } = useAuthContext()

    const refresh = async () => {
        // backend todo: need to override get method inside the refresh view by creating our own 
        // and inherit the rest from refresh_view(), ie POST
        const response = await axios.get('auth/token/refresh/', { withCredential: true })

        setUser(prev => {
            return { ...prev, accessToken: response.data.access_token }
        })

        return response.data.access_token

    }

    return refresh

}

export default useRefreshToken
import axios from '../services/api/axios'
import { useAuthContext } from '../contexts/AuthContext'

const useRefreshToken = () => {

    const { setUser } = useAuthContext()

    const refresh = async () => {
        // should we add post body? its the refresh token from http only cookie, only withCredentials?
        const response = await axios.post('auth/token/refresh/', { withCredential: true })

        setUser(prev => {
            return { ...prev, accessToken: response.data.access_token }
        })

        return response.data.access_token

    }

    return refresh

}

export default useRefreshToken
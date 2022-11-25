import * as axioService from '../services/api/djREST'

const useRefreshToken = () => {


    const refresh = async () => {

        try {
            const data = await axioService.authRefreshGET()

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
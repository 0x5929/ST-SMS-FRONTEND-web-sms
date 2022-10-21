import { studentStatisticsGET } from './api/djREST' 

export async function getStats(authedAxios) {
    try {
        const response = await studentStatisticsGET(authedAxios)

        return response[0]
    }
    catch(err) {
        console.error(err)
    }
}
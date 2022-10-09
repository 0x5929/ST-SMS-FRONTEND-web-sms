import axios from 'axios';


export const serverBaseUrl = 'http://127.0.0.1:8000/'

// GET request for student statistics
export const studentStatisticsGET = () => {
    let statisticsApi = 'api/sms/student_statistics/'

    axios.get(statisticsApi).then((response) => {
        console.log(response.data)
        return response.data
    })
}
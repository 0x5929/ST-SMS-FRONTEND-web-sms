import axios from 'axios'

export const serverBaseUrl = 'http://127.0.0.1:8000/'

// POST request for authentication
export const authenticationPOST = async (creds) => {
    let authUrl = 'auth/login/'
    let authBody = creds

    try {
        const response = await axios.post(serverBaseUrl + authUrl, authBody)
        console.log(response.data)

        return response.data
    }
    catch(error) {
        console.error(error)
    }
}

// GET request for student statistics
export const studentStatisticsGET = async () => {
    let statisticsUrl = 'api/sms/student_statistics/'

    try {
        const response = await axios.get(serverBaseUrl + statisticsUrl)
        console.log(response)

        return response.data
    }
    catch(error) {
        console.error(error)
    }
}


// GET request for student query

// POST request for new student

// PUT request for student edit

// DELETE request for student deletion
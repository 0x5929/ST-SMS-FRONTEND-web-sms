import axios from './axios'


export const smsEndpointUrl = 'api/sms/'

// POST request for authentication
export const authenticationPOST = async (creds) => {
    let authUrl = 'auth/login/'
    let authBody = JSON.stringify(creds)
    let config = {
        headers: { 'Content-Type' :  'application/json' }
    }

    try {
        const response = await axios.post(authUrl, authBody, config)
        console.log(response.data)

        return response.data
    }
    catch(error) {
        console.error(error)
        throw error
    }
}

// POST request for logout

export const logoutPOST = async () => {
    let logoutUrl = 'auth/logout/'
    let body = null
    let config = {
        headers: { 'Content-Type' :  'application/json' }
    }

    try {
        const response = await axios.post(logoutUrl, body, config)
        console.log(response.data)

        return response.data
    }
    catch(error) {
        console.error(error)
        throw error
    }

}

// GET request for student statistics
export const studentStatisticsGET = async (authedAxio) => {
    let statisticsUrl = 'student_statistics/'

    try {
        const response = await authedAxio.get(smsEndpointUrl + statisticsUrl)
        console.log(response)

        return response.data
    }
    catch(error) {
        console.error(error)

        return []
    }
}


// GET request for student query
export const studentQueryGET = async (authedAxio, queryParams) => {
    let queryUrl = 'students/?' + convertQueryParams(queryParams)

    try {
        const response = await authedAxio.get(smsEndpointUrl + queryUrl)
        console.log(response)

        return response.data
    }
    catch(error) {
        console.error(error)
        
        // maybe return error? or just an empty arr
        return []
    }
}

// POST request for new student
export const studentCreatePOST = async (authedAxio, studentRecord) => {
    let postUrl = 'students/'
    studentRecord['rotation'] = convertRotationUUID(authedAxio, studentRecord)

    try {
        const response = await authedAxio.post(smsEndpointUrl + postUrl, studentRecord)

        console.log(response.data)

        // we should maybe also return status code
        return response.data
    }
    catch(error) {

        console.error('something went wrong in posting student record: ', error, studentRecord)

    }
}

// PUT request for student edit
export const studentEditPUT = async (authedAxio, studentRecord) => {
    let putUrl = 'students/' + getStudentUUID(authedAxio, studentRecord['studentId']) + '/'
    studentRecord['rotation'] = convertRotationUUID(authedAxio, studentRecord)

    try {
        const response = await authedAxio.put(smsEndpointUrl + putUrl, studentRecord)
        console.log(response.data)

        // we should maybe also return status code
        return response.data
    }
    catch(error) {

        console.error('something went wrong in editting student record: ', error, studentRecord)

    }
}

// DELETE request for student deletion
export const studentRemoveDELETE = async (authedAxio, studentRecord) => {
    let delUrl = 'students/' + getStudentUUID(authedAxio, studentRecord['studentId']) + '/'

    try {
        const response = await authedAxio.delete(delUrl)

        console.log(response.data)

        // we should maybe also return status code
        return response.data
    }
    catch(error) {
        console.error('something went wrong in deleting student record: ', error, studentRecord)
    }
}

// helper methods (converting date objects accordingly)

// const convertDate = () => {}

const convertQueryParams = (paramObj) => {
    let finalStr = ''
    
    for ( const [key, value] of Object.entries(paramObj)) {
        finalStr = finalStr + key.toString() + '=' + value.toString() + '&'
    }

    if (finalStr.slice(-1) === '&') {
        finalStr = finalStr.slice(0, -1)
    }
    return finalStr
}

const convertRotationUUID = async (authedAxio, record) => {
    // convert rotation to UUID
    let rotationNumber = record['rotation']
    let programName = record['course']
    let rotationQueryStr = 'students/?rotation__rotation_number=' + rotationNumber.toString() + '&rotation__program__program_name' + programName.toString()

    try {
        const rotationQueryResponse = await authedAxio.get(smsEndpointUrl + rotationQueryStr)

        return rotationQueryResponse.data[0]['rotation']
     
    }
    catch(error) {
        console.error("there is an error in grabbing this record's rotation UUID", error, record)

        // we should return error so the POST proedure can be terminated
        return 
    }


}

const getStudentUUID = async (authedAxio, studentId) => {
    let studentIdQueryStr = 'students/?student_id=' + studentId

    try {
        const response = await authedAxio.get(smsEndpointUrl + studentIdQueryStr)
        return response.data[0]['student_uuid']
    }
    catch(error) {
        console.log("error occured in grabbing this record's student UUID", error, studentId)

        return
    }
}
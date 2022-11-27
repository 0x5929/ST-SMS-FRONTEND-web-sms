import axios from './axios'
import * as studentData from '../data/studentData'

export const smsEndpointUrl = 'api/sms/'


// GET refresh auth token
export const authRefreshGET = async () => {
    let url = 'auth/token/refresh/'

    try {
        const response = await axios.get(url)
        return response.data
    }
    catch(err) {
        console.error(err)
        throw err

    }
}


// POST request for authentication
export const authenticationPOST = async (creds) => {
    let authUrl = 'auth/login/'
    let authBody = JSON.stringify(creds)
    let config = {
        headers: { 'Content-Type' :  'application/json' }
    }

    try {
        const response = await axios.post(authUrl, authBody, config)
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

        return response.data[0]
    }
    catch(error) {
        console.error(error)
        throw error
    }
}


// GET request for student query
export const studentQueryGET = async (authedAxio, queryParams) => {
    let queryUrl = 'students/?' + convertQueryParams(queryParams)

    try {
        const response = await authedAxio.get(smsEndpointUrl + queryUrl)

        return responseObjMapper(response.data)
    }
    catch(error) {
        console.error(error)
        
        // maybe return error? or just an empty arr
        return []
    }
}

// GET request for school Info when creating
// NOTE these return to a radiogroup options, which requires { title, value }
// however, we are really only interested in the school_name in terms of query
export const schoolOptionsCreateGET = async (authedAxio) => {
    let schoolQueryUrl = 'schools/'
    let returnData = []
    try {
        const response = await authedAxio.get(smsEndpointUrl + schoolQueryUrl)
        for (let i = 0; i < response.data.length; i++) {
            returnData.push({
                value: response.data[i]['school_name'],
                title: response.data[i]['school_name']
            })
        }

        return returnData

    }
    catch(e) {
        console.error(e)
        throw e
    }
}


// GET request for school name when editting (mostly just for course and rotation options fetch)
export const schoolOptionsEditGET = async (authedAxio, rotationId) => {
    let rotationQueryUrl = 'rotations/'
    let programQueryUrl = 'programs/'
    let schoolQueryUrl = 'schools/'

    try {
        // first get programId
        const rotationResponse = await authedAxio.get(smsEndpointUrl + rotationQueryUrl + rotationId + '/')
        const programId = rotationResponse.data['program']

        // second get schoolId
        const programResponse = await authedAxio.get(smsEndpointUrl + programQueryUrl + programId + '/')
        const schoolId = programResponse.data['school']

        // last get schoolName
        const schoolResponse = await authedAxio.get(smsEndpointUrl + schoolQueryUrl + schoolId + '/')
        const schoolName = schoolResponse.data['school_name']
        
        return schoolName
    
    } 
    catch(e) {
        console.error(e)
        throw e
    }

}



// GET request for all courses
export const programNameGET = async (authedAxio, schoolName) => {
    let queryUrl = 'programs/?school__school_name=' + schoolName

    try {
        const response = await authedAxio.get(smsEndpointUrl + queryUrl)

        return programNameGetter(response.data)
    }
    catch(err) {
        console.error(err)
        throw err
    }

}

// GET request for all rotation numbers for select field options
export const rotationNumberGET = async (authedAxio, course, schoolName) => {
    if (course === '') {
        return []
    }

    let queryUrl = 'rotations/?program__program_name=' + course + '&program__school__school_name=' + schoolName

    try {
        const response = await authedAxio.get(smsEndpointUrl + queryUrl)

        console.log('rotationNumberGetter(response.data, course)', rotationNumberGetter(response.data, course))
        return rotationNumberGetter(response.data, course)

    }
    catch(err) {
        console.error(err)
        throw err
    }
}

// GET request for one single rotation given the rotation uuid
export const rotationNumberByUUIDGET = async (authedAxio, rotationUUID) => {
    let queryUrl = 'rotations/' + rotationUUID + '/'

    try {
        const response = await authedAxio.get(smsEndpointUrl + queryUrl)
        return response.data['rotation_number'].toString()

    }
    catch (e) {
        console.error(e)
        throw e
    }
}

// POST request for new student
export const studentCreatePOST = async (authedAxio, studentRecord) => {
    let postUrl = 'students/'

    try {
        studentRecord['rotation'] = await convertRotationUUID(authedAxio, studentRecord)
        studentRecord = requestObjMapper(studentRecord)

       const response = await authedAxio.post(smsEndpointUrl + postUrl, studentRecord)

        console.log(response.data)
        return response.data
        // we should maybe also return status code
    }
    catch(error) {

        console.error('something went wrong in posting student record: ', error, studentRecord)
        throw error

    }
}


// POST request for rotation 
export const rotationCreatePOST = async (authedAxio, {programName, rotation}, schoolName) => {
    let postUrl = 'rotations/'
    
    try {
        let postData = await rotationCreateDataGetter(authedAxio, programName, rotation, schoolName)
        
        const response = await authedAxio.post(smsEndpointUrl + postUrl, postData)

        return response.data
    }
    catch (e) {
        console.error(e)
        throw e
    }

}


// PUT request for student edit
// but should we change it to patch??
export const studentEditPATCH = async (authedAxio, studentRecord) => {

    try {
        let studentPk = studentRecord['pk']
        studentRecord['rotation'] = await convertRotationUUID(authedAxio, studentRecord)
        studentRecord = requestObjMapper(studentRecord)

        let patchUrl = 'students/' + studentPk + '/'
        const response = await authedAxio.patch(smsEndpointUrl + patchUrl, studentRecord)
        console.log('PATCH response.data', response.data)

        // we should maybe also return status code
        return responseObjMapper([response.data])[0]
    }
    catch(error) {

        console.error('something went wrong in editting student record: ', error, studentRecord)
        throw error
    }
}

// DELETE request for student deletion
export const studentRemoveDELETE = async (authedAxio, studentPk) => {
    let delUrl = 'students/' + studentPk + '/'

    try {
        const response = await authedAxio.delete(smsEndpointUrl + delUrl)

        console.log(response.data)

        // we should maybe also return status code
        return response.data
    }
    catch(error) {
        console.error('something went wrong in deleting student record, pk: ', error, studentPk)
        throw error
    }
}


const programNameGetter = (responseData) => {
    let programValues = []
    let finalOutput = []

    for (let i = 0; i < responseData.length; i++) {
        let programValue = responseData[i]['program_name']

        programValues.push(programValue)
    }

    // an array with unqiue names, we dont need duplicates
    let uniqueProgramValues = [...new Set(programValues)]

    for (let i = 0; i < uniqueProgramValues.length; i++) {
        let programInfo = {}
        programInfo['value'] = uniqueProgramValues[i]
        programInfo['title'] = courseMapper[uniqueProgramValues[i]]

        finalOutput.push(programInfo)
    }

    return finalOutput
}


const rotationNumberGetter = (responseData, course) => {
    let rotationNumbers = []
    let finalOutput = []

    for (let i = 0; i < responseData.length; i++) {
        let rotationValue = responseData[i]['rotation_number']

        rotationNumbers.push(rotationValue)
    }

    // an array with unqiue rotation numbers, we dont need duplicates
    let uniqueRotationNumbers = [...new Set(rotationNumbers)].sort(function(a, b) { return b - a })


    //numArray = numArray.sort(function (a, b) {  return a - b;  });
    for (let i = 0; i < uniqueRotationNumbers.length; i++) {
        let rotationInfo = {}
        rotationInfo['course'] = course
        rotationInfo['value'] = uniqueRotationNumbers[i].toString()
        rotationInfo['title'] = rotationInfo['course'] + ' rotation ' + rotationInfo['value']

        finalOutput.push(rotationInfo)
    }

    return finalOutput

}

const rotationCreateDataGetter = async (authedAxio, programName, rotationNumber, schoolName) => {
    let queryUrl = 'rotations/?program__program_name=' + programName + '&program__school__school_name=' + schoolName
    let data = {}

    // get program uuid 
    try {
        const response = await authedAxio.get(smsEndpointUrl + queryUrl)
        const programUUID = response.data[0]['program']

        data['program'] = programUUID
        data['rotation_number'] = rotationNumber

        return data
        
    }
    catch (e) {
        console.error(e)
        throw e
    }
}

// helper methods (converting date objects accordingly)

// const convertDate = () => {}

const convertQueryParams = (paramArr) => {
    let finalStr = ''
    
    for (let i = 0; i < paramArr.length; i++) {

        if (paramArr[i].query.toString() === 'pk') {
            continue
        }

        finalStr = finalStr + paramArr[i].query.toString() + '=' + paramArr[i].value.toString() + '&'

    }

    if (finalStr.slice(-1) === '&') {
        finalStr = finalStr.slice(0, -1)
    }

    return finalStr
}

// given a record's rotation number, grab its rotation uuid from API
export const convertRotationUUID = async (authedAxio, { rotation, course, school}) => {

    let rotationNumQueryStr = 'rotations/?rotation_number=' + rotation.toString() + '&program__program_name=' + course.toString() + '&program__school__school_name=' + school.toString()

    try {
        const rotationQueryResponse = await authedAxio.get(smsEndpointUrl + rotationNumQueryStr)

        return rotationQueryResponse.data[0]['rotation_uuid']
     
    }
    catch(error) {
        console.error("there is an error in grabbing this record's rotation UUID", error)

        // we should return error so the POST proedure can be terminated
        throw error 
    }


}


const dataMapper = {
    rotation: 'rotation',
    student_uuid : 'pk',
    student_id : 'studentId',
    first_name : 'firstName',
    last_name : 'lastName',
    phone_number : 'phoneNumber',
    email : 'email',
    mailing_address : 'mailingAddress',
    course : 'course',
    rotation: 'rotation',
    start_date : 'startDate',
    completion_date : 'completionDate',
    date_enrollment_agreement_signed : 'dateEnrollmentAgreementSigned',
    third_party_payer_info : 'thirdPartyPayerInfo',
    course_cost : 'courseCost',
    total_charges_charged : 'chargesCharged',
    total_charges_paid : 'chargesPaid',
    paid : 'paid',
    graduated : 'graduated',
    passed_first_exam : 'passedFirstExam',
    passed_second_or_third_exam : 'passedSecondOrThird',
    employed : 'employed',
    place_of_employment : 'placeOfEmployment',
    employment_address : 'employmentAddress',
    position : 'position',
    starting_wage : 'startingWage',
    hours_worked_weekly : 'hoursWorked',
    description_of_attempts_to_contact_student : 'descriptionAttempts'

}

const courseMapper = {
    CNA :  'Certified Nurse Assistant',
    HHA : 'Home Health Aide',
    SG  : 'Security Guard',
    CG  : 'Caregiver',
    ESOL: 'English to Speakers of Other Language',
    BLS : 'Basic Life Support',
    HSFA: 'Heartsaver First Aid'
}


const responseObjMapper = (APIResponseData) => {
    let finalArray = []
    for (let i = 0; i < APIResponseData.length; i++) {
        let newRecordObj = {}

        Object.keys(APIResponseData[i]).forEach(function(key) {

            if (key in dataMapper) {
                newRecordObj[dataMapper[key]] = APIResponseData[i][key]        
            }
            else {
                newRecordObj[key] = APIResponseData[i][key]  
            }

        })

        finalArray.push(newRecordObj)
    }
    return finalArray

}


const requestObjMapper = (clientRequestData) => {
    const finalObj = {}

    // need to make sure mapperKey maps to dataValue
    for (const [ dataKey, dataValue ] of Object.entries(clientRequestData)) {
        
        for (const [ mapperKey, mapperValue ] of Object.entries(dataMapper)) {
            // check if key is same as dataMapper values
            if (dataKey === mapperValue) {
                finalObj[mapperKey] = dataValue
            }

        }

    }

    return finalObj

}
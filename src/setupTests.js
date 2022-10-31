import { SMSStats, sampleStudentData, sampleCourseOptions } from './services/data/studentData'

// mocking the entire module of djREST, bc it is the module that connects to backend API
import { 
    authRefreshGET, 
    authenticationPOST, 
    logoutPOST, 
    studentStatisticsGET, 
    studentQueryGET, 
    programNameGET, 
    studentCreatePOST, 
    rotationCreatePOST,
    studentRemoveDELETE,
    studentEditPUT 
} from './services/api/djREST'

jest.mock('./services/api/djREST')

const mockResolvedValues = {
    authRefreshGET      : {access: '__TEST_ACCESS__'},
    authenticationPOST  : {user: '__TEST_USER__', access_code : '__TEST_ACCESS__', refresh_code: '__TEST_REFRESH__'},
    logoutPOST          : [],
    studentStatisticsGET: SMSStats,
    studentQueryGET     : sampleStudentData,
    programNameGET      : sampleCourseOptions,
    studentCreatePOST   : [],
    rotationCreatePOST  : [],
    studentEditPUT      : sampleStudentData[0],
    studentRemoveDELETE : [],
}




beforeEach(() => {

    authRefreshGET.mockResolvedValue(mockResolvedValues['authRefreshGET'])
    authenticationPOST.mockResolvedValue(mockResolvedValues['authenticationPOST'])
    logoutPOST.mockResolvedValue(mockResolvedValues['logoutPOST'])
    studentStatisticsGET.mockResolvedValue(mockResolvedValues['studentStatisticsGET'])
    studentQueryGET.mockResolvedValue(mockResolvedValues['studentQueryGET'])
    programNameGET.mockResolvedValue(mockResolvedValues['programNameGET'])
    studentCreatePOST.mockResolvedValue(mockResolvedValues['studentCreatePOST'])
    rotationCreatePOST.mockResolvedValue(mockResolvedValues['rotationCreatePOST'])
    studentEditPUT.mockResolvedValue(mockResolvedValues['studentEditPUT'])
    studentRemoveDELETE.mockResolvedValue(mockResolvedValues['studentRemoveDELETE'])


})


// import * as useRefreshToken from './hooks/useRefreshToken'
import * as axioService from './services/api/djREST'

import { SMSStats, sampleStudentData, sampleCourseOptions } from './services/data/studentData'


var mockResolvedValues = {
    authRefreshGET      : {access: '__TEST_ACCESS__'},
    authenticationPOST  : {user: '__TEST_USER__', access_code : '__TEST_ACCESS__', refresh_code: '__TEST_REFRESH__'},
    logoutPOST          : [],
    studentStatisticsGET: SMSStats,
    studentQueryGET     : sampleStudentData,
    programNameGET      : sampleCourseOptions,
    studentCreatePOST   : [],
    rotationCreatePOST  : [],
    studentEditPUT      : sampleStudentData[0],
}




beforeEach(() => {

    // jest.mock('./services/api/djREST', () => ({
    //     __esModule: true,
    //     authRefreshGET: jest.fn().mockResolvedValue(mockResolvedValues['authRefreshGET']),
    //     authenticationPOST : jest.fn().mockResolvedValue(mockResolvedValues['authenticationPOST']),
    //     studentStatisticsGET: jest.fn().mockResolvedValue(mockResolvedValues['studentStatisticsGET']),
    //     studentQueryGET: jest.fn().mockResolvedValue(mockResolvedValues['studentQueryGET']),
    //     programNameGET: jest.fn().mockResolvedValue(mockResolvedValues['programNameGET']),
    //     studentCreatePOST: jest.fn().mockResolvedValue(mockResolvedValues['studentCreatePOST']),
    //     rotationCreatePOST: jest.fn().mockResolvedValue(mockResolvedValues['rotationCreatePOST']),
    //     studentEditPUT : jest.fn().mockResolvedValue(mockResolvedValues['studentEditPUT']),
    
    // }))
    
    // mock djREST module, each give it a value to resolve to.
    const convertRotationUUIDMk = jest.spyOn(axioService, 'convertRotationUUID')
    convertRotationUUIDMk.mockResolvedValue('__TEST_ROTATION_UUID__')
    
    const studentStatisticsGETMk = jest.spyOn(axioService, 'studentStatisticsGET')
    studentStatisticsGETMk.mockResolvedValue(SMSStats)
    
    const studentQueryGETMk = jest.spyOn(axioService, 'studentQueryGET')
    studentQueryGETMk.mockResolvedValue(sampleStudentData)
    
    const programNameGETMk = jest.spyOn(axioService, 'programNameGET')
    programNameGETMk.mockResolvedValue(sampleCourseOptions)

    const studentCreatePOSTMk = jest.spyOn(axioService, 'studentCreatePOST')
    studentCreatePOSTMk.mockResolvedValue([])



    const authenticationPOSTMk = jest.spyOn(axioService, 'authenticationPOST')
    authenticationPOSTMk.mockResolvedValue({user: '__TEST_USER__', access_code : '__TEST_ACCESS__', refresh_code: '__TEST_REFRESH__'})


    const authRefreshGETMk = jest.spyOn(axioService, 'authRefreshGET')
    authRefreshGETMk.mockResolvedValue({access: '__TEST_ACCESS__'})
})


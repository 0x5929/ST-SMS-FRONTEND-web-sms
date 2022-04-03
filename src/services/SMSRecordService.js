import * as localStorageOps from './api/localStorageOperations'
import * as studentData from '../data/studentData'

const KEYS = {
    students: 'students',
    studentPk: 'studentPk'
}

export const getCourseOptions = ()=>([
    {value: 'CNA', title: 'Certified Nurse Assistant'},
    {value: 'HHA', title: 'Home Health Aide'},
    {value: 'SG', title: 'Security Guard'},
    {value: 'CG', title: 'Caregiver'},
    {value: 'ESOL', title: 'English to Speakers of Other Language'},
    {value: 'BLS', title: 'Basic Life Support'},
    {value: 'HSFA', title: 'Heartsaver First Aid'},
])


// future apis could have different logic when inserting/creating record
export function createRecord(data) {
    let students = localStorageOps.getAllRecords(KEYS.students);
    
    data['pk'] = localStorageOps.generateRecordPk(KEYS.studentPk)
    
    students.push(data)
    localStorageOps.insertRecord(KEYS.students, students)
}

export function getAllRecords() {
    return localStorageOps.getAllRecords(KEYS.students);
}

export function insertSampleRecords() {
    localStorageOps.insertRecord(KEYS.students, studentData.sampleStudentData)
}
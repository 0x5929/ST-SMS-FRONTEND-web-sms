import * as localStorageOps from './api/localStorageOperations'
import * as studentData from './data/studentData'
import * as tableData from './data/tableData'

const KEYS = {
    students: 'students',
    studentPk: 'studentPk'
}

export const getCourseOptions = ()=>{
    
    // API call for https://backend.api/api/sms/programs/
    // filter through for program names
    return [
    {value: 'CNA', title: 'Certified Nurse Assistant'},
    {value: 'HHA', title: 'Home Health Aide'},
    {value: 'SG', title: 'Security Guard'},
    {value: 'CG', title: 'Caregiver'},
    {value: 'ESOL', title: 'English to Speakers of Other Language'},
    {value: 'BLS', title: 'Basic Life Support'},
    {value: 'HSFA', title: 'Heartsaver First Aid'},
]}

export const getRotationOptions = (course) => {
    // API call for https://backend.api/api/sms/rotations/program__program_name=<course>
    // filter through and str(rotation_number) of each rotations
    // return data in the following format (inverse from biggest to lowest)
    

    return [
        {course: course, value: '10', title: course + ' rotation 10'},
        {course: course, value: '9', title: course + ' rotation 9'},
        {course: course, value: '8', title: course + ' rotation 8'},
        {course: course, value: '7', title: course + ' rotation 7'},
        {course: course, value: '6', title: course + ' rotation 6'},
        {course: course, value: '5', title: course + ' rotation 5'},
        {course: course, value: '4', title: course + ' rotation 4'},
        {course: course, value: '3', title: course + ' rotation 3'},
        {course: course, value: '2', title: course + ' rotation 2'},
        {course: course, value: '1', title: course + ' rotation 1'},
    ]
}

export const getQueryOptions = () => ([
    {value: 'rotation__program__school__school_name', title: 'School Name'},
    {value: 'rotation__program__program_name', title: 'Program Name'},
    {value: 'rotation__rotation_number', title: 'Rotation Number'},
    {value: 'student_id', title: 'Student ID'},
    {value: 'first_name', title: 'First Name (Exact)'},
    {value: 'cfirst_name', title: 'First Name (Contains)'},
    {value: 'last_name', title: 'Last Name (Exact)'},
    {value: 'clast_name', title: 'Last Name (Contains)'},
    {value: 'phone_number', title: 'Phone Number'},
    {value: 'email', title: 'Email'},
    {value: 'start_date', title: 'Start Date'},
    {value: 'completion_date', title: 'Completion Date'},
    {value: 'date_enrollment_agreement_signed', title: 'Date Enrollment Agreement Signed'},
    {value: 'paid', title: 'Paid'},
    {value: 'employed', title: 'Employed'},
    {value: 'graduated', title: 'Graduated'},
    {value: 'passed_first_exam', title: 'Passed First Exam'},
    {value: 'passed_second_or_third_exam', title: 'Passed Second or Third Exam'},
    {value: 'google_sheet_migrated', title: 'Google Sheet Migrated'},
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
    if (getAllRecords().length === 0){
        localStorageOps.insertRecord(KEYS.students, studentData.sampleStudentData)
    }
}

export function updateRecord(record, recordToEdit) {
    return localStorageOps.updateRecord(KEYS.students, record, recordToEdit)
}

export function getRecordIndex(record) {
    return localStorageOps.getRecordIndex(KEYS.students, record)
}


export function deleteRecord (pk) {
    return localStorageOps.deleteRecord(KEYS.students, pk)
}


export function getInitialStudentValues () {
    return studentData.initialStudentValues
}

export function getHoursWorkedRadioItems() {
    return studentData.hoursWorkedRadioItems
}

export function getTableData (){
    return tableData
}
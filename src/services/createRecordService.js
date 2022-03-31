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


export function insertStudent(data) {
    let students = getAllStudents();
    
    data['pk'] = generateStudentPk()
    
    students.push(data)
    localStorage.setItem(KEYS.students, JSON.stringify(students))
}

export function generateStudentPk() {
    if (localStorage.getItem(KEYS.studentPk) == null){
        localStorage.setItem(KEYS.studentPk, '0')
    }

    let pk = parseInt(localStorage.getItem(KEYS.studentPk))
    
    localStorage.setItem(KEYS.studentPk, (++pk).toString())

    return pk;
}

export function getAllStudents() {
    if (localStorage.getItem(KEYS.students) == null) {
        localStorage.setItem(KEYS.students, JSON.stringify([]))
    }

    return JSON.parse(localStorage.getItem(KEYS.students));
}
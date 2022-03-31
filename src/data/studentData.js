const initialStudentValues = {

    id: 0,
    studentId : '',
    firstName : '',
    lastName  : '',
    phoneNumber: '',
    email: '',
    mailingAddress : '',
    course: '',
    startDate: new Date(),
    completionDate: new Date(),
    dateEnrollmentAgreementSigned: new Date(),
    thirdPartyPayerInfo: '',
    courseCost: '',
    chargesCharged : '',
    chargesPaid: '',
    paid: false,
    graduated: false,
    passedFirstExam: false,
    passedSecondOrThird: false,
    employed: false,
    position: '',
    employmentAddress: '',
    startingWage: '',
    hoursWorked: '',
    descriptionAttempts: ''

}

const hoursWorkedItems = [
    {value: 'F', title: 'Full-time'},
    {value: 'P', title: 'Part-time'}
]

export {initialStudentValues, hoursWorkedItems}
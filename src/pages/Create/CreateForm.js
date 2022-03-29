import React, { useState } from 'react'
import { Grid, TextField } from '@mui/material';

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
    startingWage: null,
    hoursWorked: '',
    descriptionAttempts: ''

}


export default function CreateForm() {

    const [values, setValues] = useState(initialStudentValues);


    return (
    <form>
        <Grid container>
            <Grid item xs={6}></Grid>
                <TextField 
                    variant="outlined"
                    label="Student ID"
                    value={values.studentID}
                />
            <Grid item xs={6}></Grid>
        </Grid>
    </form>
  )
}

// STOPPED IN VIDEO 9:00 mark https://www.youtube.com/watch?v=-XKaSCU0ZLM&ab_channel=CodAffection
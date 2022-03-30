import React from 'react'
import {  Grid } from '@mui/material';
import { useForm, Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls'
import * as createService from '../../services/createService'


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

export default function CreateForm() {

    const {
        values, 
        setValues,
        handleInputChange
    } = useForm(initialStudentValues);


    return (
    <Form>
        <Grid container>
            <Grid item xs={6}>

                <Controls.Input 
                    name="studentId"
                    label="Student ID"
                    value={values.studentId}
                    onChange={handleInputChange}    
                />
                <Controls.Input 
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleInputChange}    
                />
                <Controls.Input 
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleInputChange}    
                />
                <Controls.Input 
                    name="phoneNumber"
                    label="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleInputChange}    
                />
            </Grid>
            <Grid item xs={6}>
                <Controls.RadioGroup
                    name="hoursWorked"
                    label="Hours Worked"
                    value={values.hoursWorked}
                    onChange={handleInputChange}
                    items={hoursWorkedItems}
                />
                <Controls.Select
                    name="course"
                    label="Course"
                    value={values.course}
                    onChange={handleInputChange}
                    options={createService.getHoursWorkedOptions()}

                />
                <Controls.DatePicker
                    name="startDate"
                    label="Program Start Date"
                    value={values.startDate}
                    onChange={handleInputChange}
                />
                <Controls.Checkbox 
                    name="graduated"
                    label="Graduated"
                    value={values.graduated}
                    onChange={handleInputChange}
                />
                <Controls.Button
                    type="submit"
                    text="Submit"
                />
            </Grid>
        </Grid>
    </Form>
  )
}

// STOPPED IN VIDEO 9:00 mark https://www.youtube.com/watch?v=-XKaSCU0ZLM&ab_channel=CodAffection
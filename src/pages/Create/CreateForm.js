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
            <Grid item xs={12}>
                <Controls.Typography
                    text="Create New Student Record"
                    align='center'
                    sx={{ marginBottom:  5}}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Controls.Input 
                    name="studentId"
                    label="Student ID"
                    value={values.studentId}
                    onChange={handleInputChange}
                    required
                />
                <Controls.Input 
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleInputChange}  
                    required  
                />
                <Controls.Input 
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleInputChange} 
                    required   
                />
                <Controls.Input 
                    name="phoneNumber"
                    label="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleInputChange}   
                    required 
                />
                <Controls.Input 
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange} 
                    required   
                />
                <Controls.Input 
                    name="mailingAddress"
                    label="Mailing Address"
                    value={values.mailingAddress}
                    onChange={handleInputChange}  
                    required  
                />
                <Controls.Select
                    name="course"
                    label="Course"
                    value={values.course}
                    onChange={handleInputChange}
                    options={createService.getHoursWorkedOptions()}
                    required
                />
                <Controls.DatePicker
                    name="startDate"
                    label="Program Start Date"
                    value={values.startDate}
                    onChange={handleInputChange}
                />
                <Controls.DatePicker
                    name="completionDate"
                    label="Program Completion Date"
                    value={values.completionDate}
                    onChange={handleInputChange}
                />
                <Controls.DatePicker
                    name="dateEnrollmentAgreementSigned"
                    label="Date Enrollment Agreement Signed"
                    value={values.dateEnrollmentAgreementSigned}
                    onChange={handleInputChange}
                    disableFuture
                />
                <Controls.Input 
                    name="thirdPartyPayerInfo"
                    label="Third Party Payer Info"
                    value={values.thirdPartyPayerInfo}
                    onChange={handleInputChange}
                    required  
                />
                <Controls.Input 
                    name="courseCost"
                    label="Course Cost"
                    value={values.courseCost}
                    onChange={handleInputChange}
                    required
                />
                <Controls.Input 
                    name="chargesCharged"
                    label="Charges Charged"
                    value={values.chargesCharged}
                    onChange={handleInputChange}
                    required
                />
                <Controls.Input 
                    name="chargesPaid"
                    label="Charges Paid"
                    value={values.chargesPaid}
                    onChange={handleInputChange}
                    required
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Controls.Checkbox 
                    name="graduated"
                    label="Graduated"
                    value={values.graduated}
                    onChange={handleInputChange}
                />
                <Controls.Checkbox 
                    name="passedFirstExam"
                    label="Passed First Exam"
                    value={values.passedFirstExam}
                    onChange={handleInputChange}
                />
                <Controls.Checkbox 
                    name="passedSecondOrThird"
                    label="Passed Second or Third Exam"
                    value={values.passedSecondOrThird}
                    onChange={handleInputChange}
                />
                <Controls.Checkbox 
                    name="employed"
                    label="Employed"
                    value={values.employed}
                    onChange={handleInputChange}
                />
                <Controls.Input 
                    name="position"
                    label="Employment Position"
                    value={values.position}
                    onChange={handleInputChange}
                />
                <Controls.Input 
                    name="employmentAddress"
                    label="Employment Address"
                    value={values.employmentAddress}
                    onChange={handleInputChange}
                />
                <Controls.Input 
                    name="startingWage"
                    label="Starting Wage"
                    value={values.startingWage}
                    onChange={handleInputChange}
                />
                <Controls.RadioGroup
                    name="hoursWorked"
                    label="Hours Worked"
                    value={values.hoursWorked}
                    onChange={handleInputChange}
                    items={hoursWorkedItems}
                />
                <Controls.Input 
                    name="descriptionAttempts"
                    label="Comments"
                    value={values.descriptionAttempts}
                    onChange={handleInputChange}
                    multiline
                    rows={7}
                />
                <Controls.Button
                    type="submit"
                    text="Submit"
                />
                <Controls.Button
                    color="secondary"
                    text="Cancel"
                />
            </Grid>
        </Grid>
    </Form>
  )
}

// STOPPED IN VIDEO 9:00 mark https://www.youtube.com/watch?v=-XKaSCU0ZLM&ab_channel=CodAffection
import React from 'react'
import { Grid } from '@mui/material';

import Controls from '../../components'

import useForm from '../../controllers/create/createFormController'
import useValidate from '../../controllers/create/createFormValidation'

import * as studentRecordService from '../../services/createRecordService'
import * as studentData from '../../data/studentData'


export default function CreateForm() {



    const {
        values, 
        // setValues,
        errors,
        // setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel
    } = useForm(studentData.initialStudentValues, true, useValidate, studentRecordService);



    /** NOTE: I could have put value fields separated into arrays, and then arrays.map() and really save some space here
     * But I don't think that clever way of outputting components will increase readability, also, it introduces more logic 
     * into this file, which should be just kept with rendering components, imo.
     */
    return (
    <Controls.Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={12}>
                <Controls.Typography
                    text="CREATE NEW STUDENT RECORD"
                    align='center'
                    sx={{ marginBottom:  3}}
                />
                <hr />
            </Grid>
            <Grid item md={6} sm={12}>
                <Controls.Input 
                    name="studentId"
                    label="Student ID"
                    value={values.studentId}
                    onChange={handleInputChange}
                    error={errors.studentId}
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
                    error={errors.phoneNumber}
                    required 
                />
                <Controls.Input 
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange} 
                    error={errors.email}
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
                    onChange={handleInputChange}
                    options={studentRecordService.getCourseOptions()}
                    error={errors.course}
                    value={values.course}
                    defaultValue={studentRecordService.getCourseOptions()[0].value}
                    required
                />
                <Controls.DatePicker
                    name="startDate"
                    label="Program Start Date"
                    value={values.startDate}
                    onChange={handleInputChange}
                    error={errors.startDate}
                />
                <Controls.DatePicker
                    name="completionDate"
                    label="Program Completion Date"
                    value={values.completionDate}
                    onChange={handleInputChange}
                    error={errors.completionDate}
                />
                <Controls.DatePicker
                    name="dateEnrollmentAgreementSigned"
                    label="Date Enrollment Agreement Signed"
                    value={values.dateEnrollmentAgreementSigned}
                    onChange={handleInputChange}
                    error={errors.dateEnrollmentAgreementSigned}
                    disableFuture
                />
                <Controls.Input 
                    name="thirdPartyPayerInfo"
                    label="Third Party Payer Info"
                    value={values.thirdPartyPayerInfo}
                    onChange={handleInputChange}
                />
                <Controls.Input 
                    name="courseCost"
                    label="Course Cost"
                    value={values.courseCost}
                    onChange={handleInputChange}
                    error={errors.courseCost}
                    required
                />
                <Controls.Input 
                    name="chargesCharged"
                    label="Charges Charged"
                    value={values.chargesCharged}
                    onChange={handleInputChange}
                    error={errors.chargesCharged}
                    required
                />
                <Controls.Input 
                    name="chargesPaid"
                    label="Charges Paid"
                    value={values.chargesPaid}
                    onChange={handleInputChange}
                    error={errors.chargesPaid}
                    required
                />
            </Grid>
            <Grid item md={6} sm={12}>
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
                    items={studentData.hoursWorkedItems}
                />
                <Controls.Input 
                    name="descriptionAttempts"
                    label="Comments"
                    value={values.descriptionAttempts}
                    onChange={handleInputChange}
                    multiline
                    rows={15}
                />
                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                    />
                    <Controls.Button
                        color="error"
                        text="Cancel"
                        onClick={handleCancel}
                    />
                </div>
            </Grid>
        </Grid>
    </Controls.Form>
  )
}

// STOPPED IN VIDEO 9:00 mark https://www.youtube.com/watch?v=-XKaSCU0ZLM&ab_channel=CodAffection
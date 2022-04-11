import React, { useEffect } from 'react'
import { Grid } from '@mui/material'

import { Input, Select, DatePicker, Checkbox, RadioGroup } from './Inputs'
import {Button} from './Button'
import SearchBar from './SearchBar'
import Form from './Form'
import Card from './Card'
 

export function StudentFormGrid(props) {


    const { 
            values, 
            errors, 
            handleInputChange, 
            handleCancel,
            getCourseOptions,
            hoursWorkedRadioItems, 
            recordForEdit,
            populateFormFieldsForEdit,
            } = props


    // hook to add student data to edit fields in the form
    useEffect(()=>{
        if (populateFormFieldsForEdit){
            populateFormFieldsForEdit(recordForEdit)
    }},
    [populateFormFieldsForEdit, recordForEdit])



    /** NOTE: I could have put value fields separated into arrays, and then arrays.map() and really save some space here
     * But I don't think that clever way of outputting components will increase readability, also, it introduces more logic 
     * into this file, which should be just kept with rendering components, imo.
     */

    return (
    <Grid container>

        <Grid item md={6} sm={12}>
            <Input 
                name="studentId"
                label="Student ID"
                value={values.studentId}
                onChange={handleInputChange}
                error={errors.studentId}
                required
            />
            <Input 
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleInputChange}  
                required  
            />
            <Input 
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleInputChange} 
                required   
            />
            <Input 
                name="phoneNumber"
                label="Phone Number"
                value={values.phoneNumber}
                onChange={handleInputChange} 
                error={errors.phoneNumber}
                required 
            />
            <Input 
                name="email"
                label="Email"
                value={values.email}
                onChange={handleInputChange} 
                error={errors.email}
                required   
            />
            <Input 
                name="mailingAddress"
                label="Mailing Address"
                value={values.mailingAddress}
                onChange={handleInputChange}  
                required  
            />
            <Select
                name="course"
                label="Course"
                onChange={handleInputChange}
                options={getCourseOptions()}
                error={errors.course}
                value={values.course}
                defaultValue={getCourseOptions()[0].value}
                required
            />
            <DatePicker
                name="startDate"
                label="Program Start Date"
                value={values.startDate}
                onChange={handleInputChange}
                error={errors.startDate}
            />
            <DatePicker
                name="completionDate"
                label="Program Completion Date"
                value={values.completionDate}
                onChange={handleInputChange}
                error={errors.completionDate}
            />
            <DatePicker
                name="dateEnrollmentAgreementSigned"
                label="Date Enrollment Agreement Signed"
                value={values.dateEnrollmentAgreementSigned}
                onChange={handleInputChange}
                error={errors.dateEnrollmentAgreementSigned}
                disableFuture
            />
            <Input 
                name="thirdPartyPayerInfo"
                label="Third Party Payer Info"
                value={values.thirdPartyPayerInfo}
                onChange={handleInputChange}
            />
            <Input 
                name="courseCost"
                label="Course Cost"
                value={values.courseCost}
                onChange={handleInputChange}
                error={errors.courseCost}
                required
            />
            <Input 
                name="chargesCharged"
                label="Charges Charged"
                value={values.chargesCharged}
                onChange={handleInputChange}
                error={errors.chargesCharged}
                required
            />
            <Input 
                name="chargesPaid"
                label="Charges Paid"
                value={values.chargesPaid}
                onChange={handleInputChange}
                error={errors.chargesPaid}
                required
            />
        </Grid>
        <Grid item md={6} sm={12}>
            <Checkbox 
                name="graduated"
                label="Graduated"
                value={values.graduated}
                onChange={handleInputChange}
            />
            <Checkbox 
                name="passedFirstExam"
                label="Passed First Exam"
                value={values.passedFirstExam}
                onChange={handleInputChange}
            />
            <Checkbox 
                name="passedSecondOrThird"
                label="Passed Second or Third Exam"
                value={values.passedSecondOrThird}
                onChange={handleInputChange}
            />
            <Checkbox 
                name="employed"
                label="Employed"
                value={values.employed}
                onChange={handleInputChange}
            />
            <Input 
                name="position"
                label="Employment Position"
                value={values.position}
                onChange={handleInputChange}
            />
            <Input 
                name="placeOfEmployment"
                label="Place of Employment"
                value={values.placeOfEmployment}
                onChange={handleInputChange}
            />
            <Input 
                name="employmentAddress"
                label="Employment Address"
                value={values.employmentAddress}
                onChange={handleInputChange}
            />
            <Input 
                name="startingWage"
                label="Starting Wage"
                value={values.startingWage}
                onChange={handleInputChange}
            />
            <RadioGroup
                name="hoursWorked"
                label="Hours Worked"
                value={values.hoursWorked}
                onChange={handleInputChange}
                items={hoursWorkedRadioItems}
            />
            <Input 
                name="descriptionAttempts"
                label="Comments"
                value={values.descriptionAttempts}
                onChange={handleInputChange}
                multiline
                rows={15}
            />
            <div>
                <Button
                    type="submit"
                    text="Submit"
                />
                <Button
                    color="error"
                    text="Cancel"
                    onClick={handleCancel}
                />
            </div>
        </Grid>
    </Grid>
  )
}


export function QueryLayoutGrid(props) {

    const {
        textInput,
        handleClear,
        queryLabel,
        handleSubmit,
        getStats
    } = props;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Form onSubmit={(e)=>(handleSubmit(e))}>
                    <SearchBar 
                        label={queryLabel}
                        textInput={textInput}
                        handleClear={handleClear}
                    />
                </Form>
            </Grid>
            <Grid item md={3} sm={12}>
                <Card 
                    title="School Statistics"
                    model="school"
                    stats={getStats.school()}
                />
            </Grid>
            <Grid item md={3} sm={12}>
                <Card 
                    title="Program Statistics"
                    model="program"
                    stats={getStats.program()}
                />
            </Grid>
            <Grid item md={3} sm={12}>
                <Card 
                    title="Rotation Statistics"
                    model="rotation"
                    stats={getStats.rotation()}
                />
            </Grid>
            <Grid item md={3} sm={12}>
                <Card 
                    title="Student Statistics"
                    model="student"
                    stats={getStats.student()}
                />
            </Grid>
        </Grid>
    )
}
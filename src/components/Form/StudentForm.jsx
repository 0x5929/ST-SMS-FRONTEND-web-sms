import React, { useCallback, useRef } from 'react';

import { 
    Grid, 
    Box as MuiBox, 
    CircularProgress as MuiCircularProgress,
    Stack as MuiStack } from '@mui/material';

import { 
    Check as CheckIcon, 
    Save as SaveIcon,
    AddBox as AddBoxIcon } from '@mui/icons-material';

import AddRotationForm  from './AddRotationForm'

import {
    Input,
    Input2,
    Select,
    DatePicker,
    Checkbox,
    RadioGroup } from '../Inputs'

import {
    BaseButton as Button,
    BaseIconButton,
    BaseFab } from '../Buttons'

import { Modal as BaseModal } from '../Modal';
import { createStudentFormStyles } from './styles'


const Styles = createStudentFormStyles({
    MuiStack,
    BaseIconButton,
    MuiBox,
    BaseFab,
    BaseModal,
    MuiCircularProgress
})


function StudentForm({ studentFormStates, studentFormHandlers, studentEditFormHandlers, ...others }) {

    console.log('StudentForm component rendered')
    const {
    
        studentFormState : {
            studentFormValues,
            studentFormErrors,
            submitLoading,
            submitSuccess,
        },

        addRotStates : {
            rotationFormValues,
            rotationFormErrors,
            isAddRotModalOpen,
        }
    } = studentFormStates

    const {

        handleInputChange,
        handleSubmit,
        handleCancel,
        convertToDefaultEventParam,
        getCourseOptions, 
        getRotationOptions, 
        getHoursWorkedRadioItems,

        addRotHandlers : {

            handleAddRotSubmit, 
            handleAddRotInputChange, 
            handleAddRotClear,

            addRotModalHandlers : {

                handleOpenAddRotModal,
                handleCloseAddRotModal
            }
        }
    } = studentFormHandlers


    if (studentEditFormHandlers !== undefined) {
            var handleEditSubmit = studentEditFormHandlers.handleEditSubmit
            var handleEditCancel = studentEditFormHandlers.handleEditCancel
    }
    else {
        handleEditSubmit = false
        handleEditCancel = false
    }

    
    const refs = {testRef: useRef(null)}
    const handleTestSubmit = (e)=> {
        e.preventDefault()

        console.log('testRef: ', refs.testRef.current.value)
    }

    return (
    <>
        <Styles.StudentForm onSubmit={handleEditSubmit || handleSubmit} {...others}>
            <Grid container>
                <Grid item laptop={6} tablet={12}>
                    <Input2 
                        ref={refs.testRef}
                        name="test"
                        label="test label"
                        initialValue=""
                        errorHandler={useCallback((value)=>{
                            if (value !== '') 
                                return {}
                            else
                                return { error: true, helperText: 'Cannot be blank dummy' }
                        }, [])}
                    />
                    <Input 
                        name="studentId"
                        label="Student ID"
                        value={studentFormValues.studentId}
                        onChange={handleInputChange}
                        error={studentFormErrors.studentId}
                        
                    />
                    <Input 
                        name="firstName"
                        label="First Name"
                        value={studentFormValues.firstName}
                        onChange={handleInputChange}  
                        error={studentFormErrors.firstName}
                        
                    />
                    <Input 
                        name="lastName"
                        label="Last Name"
                        value={studentFormValues.lastName}
                        onChange={handleInputChange} 
                        error={studentFormErrors.lastName}
                        
                    />
                    <Input 
                        name="phoneNumber"
                        label="Phone Number"
                        value={studentFormValues.phoneNumber}
                        onChange={handleInputChange} 
                        error={studentFormErrors.phoneNumber}
                        
                    />
                    <Input 
                        name="email"
                        label="Email"
                        value={studentFormValues.email}
                        onChange={handleInputChange} 
                        error={studentFormErrors.email}
                        
                    />
                    <Input 
                        name="mailingAddress"
                        label="Mailing Address"
                        value={studentFormValues.mailingAddress}
                        onChange={handleInputChange}  
                        error={studentFormErrors.mailingAddress}
                        
                    />
                    <Select
                        name="course"
                        label="Course"
                        onChange={handleInputChange}
                        options={getCourseOptions()}
                        error={studentFormErrors.course}
                        value={studentFormValues.course}
                        defaultValue={getCourseOptions()[0].value}
                    />
                    <Styles.Stack direction="row" spacing={1}>
                        <Select
                            name="rotation"
                            label="Rotation"
                            onChange={handleInputChange}
                            options={getRotationOptions(studentFormValues.course)}
                            error={studentFormErrors.rotation}
                            value={studentFormValues.rotation}
                            defaultValue={getRotationOptions()[0].rotation}
                        />
                        <Styles.AddRotBtn size="medium" onClick={handleOpenAddRotModal}>
                            <AddBoxIcon />
                        </Styles.AddRotBtn>
                    </Styles.Stack>
                    <DatePicker
                        name="startDate"
                        label="Program Start Date"
                        value={studentFormValues.startDate}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={studentFormErrors.startDate}
                    />
                    <DatePicker
                        name="completionDate"
                        label="Program Completion Date"
                        value={studentFormValues.completionDate}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={studentFormErrors.completionDate}
                    />
                    <DatePicker
                        name="dateEnrollmentAgreementSigned"
                        label="Date Enrollment Agreement Signed"
                        value={studentFormValues.dateEnrollmentAgreementSigned}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={studentFormErrors.dateEnrollmentAgreementSigned}
                        disableFuture
                    />
                    <Input 
                        name="thirdPartyPayerInfo"
                        label="Third Party Payer Info"
                        value={studentFormValues.thirdPartyPayerInfo}
                        onChange={handleInputChange}
                    />
                    <Input 
                        name="courseCost"
                        label="Course Cost"
                        value={studentFormValues.courseCost}
                        onChange={handleInputChange}
                        error={studentFormErrors.courseCost}
                        
                    />
                    <Input 
                        name="chargesCharged"
                        label="Charges Charged"
                        value={studentFormValues.chargesCharged}
                        onChange={handleInputChange}
                        error={studentFormErrors.chargesCharged}
                        
                    />
                    <Input 
                        name="chargesPaid"
                        label="Charges Paid"
                        value={studentFormValues.chargesPaid}
                        onChange={handleInputChange}
                        error={studentFormErrors.chargesPaid}
                        
                    />
                </Grid>
                <Grid item laptop={6} tablet={12}>
                    <Checkbox 
                        name="graduated"
                        label="Graduated"
                        value={studentFormValues.graduated}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Checkbox 
                        name="passedFirstExam"
                        label="Passed First Exam"
                        value={studentFormValues.passedFirstExam}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Checkbox 
                        name="passedSecondOrThird"
                        label="Passed Second or Third Exam"
                        value={studentFormValues.passedSecondOrThird}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Checkbox 
                        name="employed"
                        label="Employed"
                        value={studentFormValues.employed}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Input 
                        name="position"
                        label="Employment Position"
                        value={studentFormValues.position}
                        onChange={handleInputChange}
                    />
                    <Input 
                        name="placeOfEmployment"
                        label="Place of Employment"
                        value={studentFormValues.placeOfEmployment}
                        onChange={handleInputChange}
                    />
                    <Input 
                        name="employmentAddress"
                        label="Employment Address"
                        value={studentFormValues.employmentAddress}
                        onChange={handleInputChange}
                    />
                    <Input 
                        name="startingWage"
                        label="Starting Wage"
                        value={studentFormValues.startingWage}
                        onChange={handleInputChange}
                    />
                    <RadioGroup
                        name="hoursWorked"
                        label="Hours Worked"
                        value={studentFormValues.hoursWorked}
                        onChange={handleInputChange}
                        items={getHoursWorkedRadioItems()}
                    />
                    <Input 
                        name="descriptionAttempts"
                        label="Comments"
                        value={studentFormValues.descriptionAttempts}
                        onChange={handleInputChange}
                        multiline
                        rows={15}
                    />
                    
                    {/* submission buttons */}

                    <Styles.ButtonContainerBox>
                        <Styles.ButtonBox sx={{ m: 1 }}>
                            {
                                submitSuccess ? 
                                
                                <Styles.SuccessFab
                                    aria-label="save"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    <CheckIcon />
                                </Styles.SuccessFab>

                                        : 

                                <BaseFab
                                    aria-label="save"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    <SaveIcon />
                                </BaseFab>

                            }
                            {
                                submitLoading && (
                                <Styles.CircularProgress size={68} />
                                )
                            }
                        </Styles.ButtonBox>
                        <Styles.ButtonBox>
                            <Button
                                type="submit"
                                text="Submit"
                                disabled={submitLoading}
                            />
                            {
                                submitLoading && (
                                <Styles.ButtonCircularProgress size={24} />   
                                )
                            }
                        </Styles.ButtonBox>
                        <Styles.ButtonBox>
                            <Button
                                color="error"
                                text="Cancel"
                                onClick={handleEditCancel || handleCancel}
                            />
                        </Styles.ButtonBox>
                    </Styles.ButtonContainerBox>
                </Grid>
            </Grid>
        </Styles.StudentForm>
        <Styles.Modal
            modalTitle="Add Rotation"
            isModalOpen={isAddRotModalOpen}
            handleCloseModal={handleCloseAddRotModal}
        >
            <AddRotationForm 
                handleAddRotInputChange={handleAddRotInputChange}
                handleAddRotSubmit={handleAddRotSubmit}
                handleAddRotClear={handleAddRotClear}
                rotationFormValues={rotationFormValues}
                rotationFormErrors={rotationFormErrors}
                getCourseOptions={getCourseOptions}
            />
        </Styles.Modal>
    </>
  )
}


export default React.memo(StudentForm)
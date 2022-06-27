import React, { useState, useCallback, useRef, useMemo } from 'react';

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
    Select2,
    DatePicker,
    DatePicker2,
    Checkbox,
    Checkbox2,
    RadioGroup,
    RadioGroup2 } from '../Inputs'

import {
    BaseButton as Button,
    BaseIconButton,
    BaseFab } from '../Buttons'

import { Modal as BaseModal } from '../Modal';
import { createStudentFormStyles } from './styles'

import { useValidations, useToggle } from '../../hooks';


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

    // put this into useStudentForms(), and return from custom hook
    const inputRefs = {
        studentId: useRef(null),
        firstName: useRef(null),
        lastName: useRef(null),
        phoneNumber: useRef(null),
        email: useRef(null),
        mailingAddress: useRef(null),
        course: useRef(null),
        rotation: useRef(null),
        startDate: useRef(null),
        completionDate: useRef(null),
        dateEnrollmentAgreementSigned: useRef(null),
        thirdPartyPayerInfo: useRef(null),
        courseCost: useRef(null),
        chargesCharged: useRef(null),
        chargesPaid: useRef(null),
        paid: useRef(null),
        graduated: useRef(null),
        passedFirstExam: useRef(null),
        passedSecondOrThird: useRef(null),
        employed: useRef(null),
        position: useRef(null),
        placeOfEmployment: useRef(null),
        employmentAddress: useRef(null),
        startingWage: useRef(null),
        hoursWorked: useRef(null),
        descriptionAttempts: useRef(null)
        
    }
    const handleTestSubmit = (e)=> {
        e.preventDefault()

        console.log('refs: ', inputRefs)
    }

    // can also use useToggle 
    const [ showError, handleToggle ] = useToggle(false)
    const validations = useValidations().useCreateValidation2()


    return (
    <>
        <Styles.StudentForm onSubmit={handleEditSubmit || ( (e) => handleSubmit(e, inputRefs, handleToggle) )} {...others}>
            <Grid container>
                <Grid item laptop={6} tablet={12}>
                    <Input2
                        ref={inputRefs.studentId}
                        name="studentId"
                        label="Student ID"
                        errorHandler={validations.studentId}
                        showError={showError} 
                    />
                    <Input2
                        ref={inputRefs.firstName}
                        name="firstName"
                        label="First Name"
                        errorHandler={validations.firstName}
                        showError={showError} 
                    />
                    <Input2 
                        ref={inputRefs.lastName}
                        name="lastName"
                        label="Last Name"
                        errorHandler={validations.lastName}
                        showError={showError} 
                    />
                    <Input2 
                        ref={inputRefs.phoneNumber}
                        name="phoneNumber"
                        label="Phone Number"
                        errorHandler={validations.phoneNumber}
                        showError={showError} 
                    />
                    <Input2 
                        ref={inputRefs.email}
                        name="email"
                        label="Email"
                        errorHandler={validations.email}
                        showError={showError}   
                    />
                    <Input2 
                        ref={inputRefs.mailingAddress}
                        name="mailingAddress"
                        label="Mailing Address"
                        errorHandler={validations.mailingAddress}
                        showError={showError}                        
                    />
                    <Select2
                        ref={inputRefs.course}
                        name="course"
                        label="Course"
                        options={getCourseOptions()}
                        defaultValue={getCourseOptions()[0].value}
                        errorHandler={validations.course}
                        showError={showError}                        
                    />
                    <Styles.Stack direction="row" spacing={1}>
                        <Select2
                            ref={inputRefs.rotation}
                            name="rotation"
                            label="Rotation"
                            options={getRotationOptions(studentFormValues.course)}
                            defaultValue={getRotationOptions()[0].rotation}
                            errorHandler={validations.rotation}
                            showError={showError}                        
                        />
                        <Styles.AddRotBtn size="medium" onClick={handleOpenAddRotModal}>
                            <AddBoxIcon />
                        </Styles.AddRotBtn>
                    </Styles.Stack>
                    <DatePicker2
                        ref={inputRefs.startDate}
                        name="startDate"
                        label="Program Start Date"
                        initialValue={useMemo(() => new Date(), [])}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        errorHandler={validations.startDate}
                        showError={showError}                        
                    />
                    <DatePicker2
                        ref={inputRefs.completionDate}
                        name="completionDate"
                        label="Program Completion Date"
                        initialValue={useMemo(() => new Date(), [])}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        errorHandler={validations.completionDate}
                        showError={showError}                        
                    />
                    <DatePicker2
                        ref={inputRefs.dateEnrollmentAgreementSigned}
                        name="dateEnrollmentAgreementSigned"
                        label="Date Enrollment Agreement Signed"
                        initialValue={useMemo(() => new Date(), [])}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        errorHandler={validations.dateEnrollmentAgreementSigned}
                        showError={showError}                        
                        disableFuture
                    />
                    <Input2 
                        ref={inputRefs.thirdPartyPayerInfo}
                        name="thirdPartyPayerInfo"
                        label="Third Party Payer Info" 

                    />
                    <Input2
                        ref={inputRefs.courseCost}
                        name="courseCost"
                        label="Course Cost"
                        errorHandler={validations.courseCost}
                        showError={showError} 
                        
                    />
                    <Input2 
                        ref={inputRefs.chargesCharged}
                        name="chargesCharged"
                        label="Charges Charged"
                        errorHandler={validations.chargesCharged}
                        showError={showError} 
                        
                    />
                    <Input2 
                        ref={inputRefs.chargesPaid}
                        name="chargesPaid"
                        label="Charges Paid"
                        errorHandler={validations.chargesPaid}
                        showError={showError} 
                        
                    />
                </Grid>
                <Grid item laptop={6} tablet={12}>
                    <Checkbox2
                        ref={inputRefs.graduated}
                        name="graduated"
                        label="Graduated"
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Checkbox2 
                        ref={inputRefs.passedFirstExam}
                        name="passedFirstExam"
                        label="Passed First Exam"
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Checkbox2 
                        ref={inputRefs.passedSecondOrThird}
                        name="passedSecondOrThird"
                        label="Passed Second or Third Exam"
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Checkbox2 
                        ref={inputRefs.employed}
                        name="employed"
                        label="Employed"
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Input2 
                        ref={inputRefs.position}
                        name="position"
                        label="Employment Position"

                    />
                    <Input2 
                        ref={inputRefs.placeOfEmployment}
                        name="placeOfEmployment"
                        label="Place of Employment"
                    />
                    <Input2 
                        ref={inputRefs.employmentAddress}
                        name="employmentAddress"
                        label="Employment Address"
                    />
                    <Input2 
                        ref={inputRefs.startingWage}
                        name="startingWage"
                        label="Starting Wage"
                    />
                    <RadioGroup2
                        ref={inputRefs.hoursWorked}
                        name="hoursWorked"
                        label="Hours Worked"
                        items={getHoursWorkedRadioItems()}
                    />
                    <Input2 
                        ref={inputRefs.descriptionAttempts}
                        name="descriptionAttempts"
                        label="Comments"
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
                                    onClick={(e) => handleSubmit(e, inputRefs, handleToggle)}
                                >
                                    <CheckIcon />
                                </Styles.SuccessFab>

                                        : 

                                <BaseFab
                                    aria-label="save"
                                    color="primary"
                                    onClick={(e) => handleSubmit(e, inputRefs, handleToggle)}
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
                                onClick={handleEditCancel || ( (e) => handleCancel(e, inputRefs, handleToggle) )}
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
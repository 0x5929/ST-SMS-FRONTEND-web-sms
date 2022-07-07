import React, { useCallback, useMemo } from 'react';

import { 
    Grid, 
    Box as MuiBox, 
    CircularProgress as MuiCircularProgress,
    Stack as MuiStack } from '@mui/material';

import { 
    Check as CheckIcon, 
    Save as SaveIcon,
    AddBox as AddBoxIcon } from '@mui/icons-material';


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
    RadioGroup2 } from '../../components/Inputs'

import {
    BaseButton as Button,
    BaseIconButton,
    BaseFab } from '../../components/Buttons'

import { Modal as BaseModal } from '../../components/Modal';
import { createStudentFormStyles } from './styles'

import { useValidations } from '../../hooks';
import ProgramForm from './ProgramForm';


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
            showError,
            clearFields,
            submitLoading,
            submitSuccess,
        },
        inputRefs,

    } = studentFormStates

    const {
        resolveValue,
        handleSubmit,
        handleCancel,
        convertToDefaultEventParam,
        getHoursWorkedRadioItems,

    } = studentFormHandlers


    // should be put inside a useEffect hook
    if (studentEditFormHandlers !== undefined) {
            var handleEditSubmit = studentEditFormHandlers.handleEditSubmit
            var handleEditCancel = studentEditFormHandlers.handleEditCancel
    }
    else {
        handleEditSubmit = false
        handleEditCancel = false
    }
    //---

    const validations = useValidations().useCreateValidation2()



    return (
    <Styles.StudentForm onSubmit={handleEditSubmit || ( (e) => handleSubmit(e, inputRefs) )} {...others}>
        <Grid container>
            <Grid item laptop={6} tablet={12}>
                <Input2
                    ref={inputRefs.studentId}
                    initialValue={resolveValue('studentId')}
                    name="studentId"
                    label="Student ID"
                    errorHandler={validations.studentId}
                    showError={showError}
                    clearFields={clearFields}
                />
                <Input2
                    ref={inputRefs.firstName}
                    initialValue={resolveValue('firstName')}
                    name="firstName"
                    label="First Name"
                    errorHandler={validations.firstName}
                    showError={showError} 
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.lastName}
                    initialValue={resolveValue('lastName')}
                    name="lastName"
                    label="Last Name"
                    errorHandler={validations.lastName}
                    showError={showError} 
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.phoneNumber}
                    initialValue={resolveValue('phoneNumber')}
                    name="phoneNumber"
                    label="Phone Number"
                    errorHandler={validations.phoneNumber}
                    showError={showError} 
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.email}
                    initialValue={resolveValue('email')}
                    name="email"
                    label="Email"
                    errorHandler={validations.email}
                    showError={showError}   
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.mailingAddress}
                    initialValue={resolveValue('mailingAddress')}
                    name="mailingAddress"
                    label="Mailing Address"
                    errorHandler={validations.mailingAddress}
                    showError={showError}    
                    clearFields={clearFields}                    
                />
                <ProgramForm 
                    validations={validations}
                    studentFormStates={studentFormStates}
                    studentFormHandlers={studentFormHandlers}
                />
                <DatePicker2
                    ref={inputRefs.startDate}
                    initialValue={resolveValue('startDate') || new Date()}
                    name="startDate"
                    label="Program Start Date"
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    errorHandler={validations.startDate}
                    showError={showError}   
                    clearFields={clearFields}                     
                />
                <DatePicker2
                    ref={inputRefs.completionDate}
                    initialValue={resolveValue('completionDate') || new Date()}
                    name="completionDate"
                    label="Program Completion Date"
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    errorHandler={validations.completionDate}
                    showError={showError}     
                    clearFields={clearFields}                   
                />
                <DatePicker2
                    ref={inputRefs.dateEnrollmentAgreementSigned}
                    initialValue={resolveValue('dateEnrollmentAgreementSigned') || new Date()}
                    name="dateEnrollmentAgreementSigned"
                    label="Date Enrollment Agreement Signed"
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    errorHandler={validations.dateEnrollmentAgreementSigned}
                    showError={showError}        
                    clearFields={clearFields}                
                    disableFuture
                />
                <Input2 
                    ref={inputRefs.thirdPartyPayerInfo}
                    initialValue={resolveValue('thirdPartyPayerInfo')}
                    name="thirdPartyPayerInfo"
                    label="Third Party Payer Info" 
                    clearFields={clearFields}
                />
                <Input2
                    ref={inputRefs.courseCost}
                    initialValue={resolveValue('courseCost')}
                    name="courseCost"
                    label="Course Cost"
                    errorHandler={validations.courseCost}
                    showError={showError} 
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.chargesCharged}
                    initialValue={resolveValue('chargesCharged')}
                    name="chargesCharged"
                    label="Charges Charged"
                    errorHandler={validations.chargesCharged}
                    showError={showError} 
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.chargesPaid}
                    initialValue={resolveValue('chargesPaid')}
                    name="chargesPaid"
                    label="Charges Paid"
                    errorHandler={validations.chargesPaid}
                    showError={showError} 
                    clearFields={clearFields}
                />
            </Grid>
            <Grid item laptop={6} tablet={12}>
                <Checkbox2
                    ref={inputRefs.graduated}
                    initialValue={resolveValue('graduated') || false}
                    name="graduated"
                    label="Graduated"
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    clearFields={clearFields}
                />
                <Checkbox2 
                    ref={inputRefs.passedFirstExam}
                    initialValue={resolveValue('passedFirstExam') || false}
                    name="passedFirstExam"
                    label="Passed First Exam"
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    clearFields={clearFields}
                />
                <Checkbox2 
                    ref={inputRefs.passedSecondOrThird}
                    initialValue={resolveValue('passedSecondOrThird') || false}
                    name="passedSecondOrThird"
                    label="Passed Second or Third Exam"
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    clearFields={clearFields}
                />
                <Checkbox2 
                    ref={inputRefs.employed}
                    initialValue={resolveValue('employed') || false}
                    name="employed"
                    label="Employed"
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.position}
                    name="position"
                    label="Employment Position"
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.placeOfEmployment}
                    name="placeOfEmployment"
                    label="Place of Employment"
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.employmentAddress}
                    initialValue={resolveValue('employmentAddress')}
                    name="employmentAddress"
                    label="Employment Address"
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.startingWage}
                    initialValue={resolveValue('startingWage')}
                    name="startingWage"
                    label="Starting Wage"
                    clearFields={clearFields}
                />
                <RadioGroup2
                    ref={inputRefs.hoursWorked}
                    initialValue={resolveValue('hoursWorked')}
                    name="hoursWorked"
                    label="Hours Worked"
                    items={getHoursWorkedRadioItems()}
                    clearFields={clearFields}
                />
                <Input2 
                    ref={inputRefs.descriptionAttempts}
                    initialValue={resolveValue('descriptionAttempts')}
                    name="descriptionAttempts"
                    label="Comments"
                    multiline
                    clearFields={clearFields}
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
                                onClick={(e) => handleSubmit(e, inputRefs)}
                            >
                                <CheckIcon />
                            </Styles.SuccessFab>

                                    : 

                            <BaseFab
                                aria-label="save"
                                color="primary"
                                onClick={(e) => handleSubmit(e, inputRefs)}
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
  )
}


export default React.memo(StudentForm)
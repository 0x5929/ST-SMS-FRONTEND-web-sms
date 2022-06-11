import React from 'react';
import Styles from './styles'

export function StudentForm({ studentFormStates, studentFormHandlers, studentEditFormHandlers, ...others }) {


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


    return (
    <>
        <Styles.StudentForm onSubmit={handleEditSubmit || handleSubmit} {...others}>
            <Styles.Grid container>
                <Styles.Grid item laptop={6} tablet={12}>
                    <Styles.Input 
                        name="studentId"
                        label="Student ID"
                        value={studentFormValues.studentId}
                        onChange={handleInputChange}
                        error={studentFormErrors.studentId}
                        
                    />
                    <Styles.Input 
                        name="firstName"
                        label="First Name"
                        value={studentFormValues.firstName}
                        onChange={handleInputChange}  
                        error={studentFormErrors.firstName}
                        
                    />
                    <Styles.Input 
                        name="lastName"
                        label="Last Name"
                        value={studentFormValues.lastName}
                        onChange={handleInputChange} 
                        error={studentFormErrors.lastName}
                        
                    />
                    <Styles.Input 
                        name="phoneNumber"
                        label="Phone Number"
                        value={studentFormValues.phoneNumber}
                        onChange={handleInputChange} 
                        error={studentFormErrors.phoneNumber}
                        
                    />
                    <Styles.Input 
                        name="email"
                        label="Email"
                        value={studentFormValues.email}
                        onChange={handleInputChange} 
                        error={studentFormErrors.email}
                        
                    />
                    <Styles.Input 
                        name="mailingAddress"
                        label="Mailing Address"
                        value={studentFormValues.mailingAddress}
                        onChange={handleInputChange}  
                        error={studentFormErrors.mailingAddress}
                        
                    />
                    <Styles.Select
                        name="course"
                        label="Course"
                        onChange={handleInputChange}
                        options={getCourseOptions()}
                        error={studentFormErrors.course}
                        value={studentFormValues.course}
                        defaultValue={getCourseOptions()[0].value}
                    />
                    <Styles.Stack direction="row" spacing={1}>
                        <Styles.Select
                            name="rotation"
                            label="Rotation"
                            onChange={handleInputChange}
                            options={getRotationOptions(studentFormValues.course)}
                            error={studentFormErrors.rotation}
                            value={studentFormValues.rotation}
                            defaultValue={getRotationOptions()[0].rotation}
                        />
                        <Styles.AddRotBtn size="medium" onClick={handleOpenAddRotModal}>
                            <Styles.AddBoxIcon />
                        </Styles.AddRotBtn>
                    </Styles.Stack>
                    <Styles.DatePicker
                        name="startDate"
                        label="Program Start Date"
                        value={studentFormValues.startDate}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={studentFormErrors.startDate}
                    />
                    <Styles.DatePicker
                        name="completionDate"
                        label="Program Completion Date"
                        value={studentFormValues.completionDate}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={studentFormErrors.completionDate}
                    />
                    <Styles.DatePicker
                        name="dateEnrollmentAgreementSigned"
                        label="Date Enrollment Agreement Signed"
                        value={studentFormValues.dateEnrollmentAgreementSigned}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={studentFormErrors.dateEnrollmentAgreementSigned}
                        disableFuture
                    />
                    <Styles.Input 
                        name="thirdPartyPayerInfo"
                        label="Third Party Payer Info"
                        value={studentFormValues.thirdPartyPayerInfo}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="courseCost"
                        label="Course Cost"
                        value={studentFormValues.courseCost}
                        onChange={handleInputChange}
                        error={studentFormErrors.courseCost}
                        
                    />
                    <Styles.Input 
                        name="chargesCharged"
                        label="Charges Charged"
                        value={studentFormValues.chargesCharged}
                        onChange={handleInputChange}
                        error={studentFormErrors.chargesCharged}
                        
                    />
                    <Styles.Input 
                        name="chargesPaid"
                        label="Charges Paid"
                        value={studentFormValues.chargesPaid}
                        onChange={handleInputChange}
                        error={studentFormErrors.chargesPaid}
                        
                    />
                </Styles.Grid>
                <Styles.Grid item laptop={6} tablet={12}>
                    <Styles.Checkbox 
                        name="graduated"
                        label="Graduated"
                        value={studentFormValues.graduated}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Checkbox 
                        name="passedFirstExam"
                        label="Passed First Exam"
                        value={studentFormValues.passedFirstExam}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Checkbox 
                        name="passedSecondOrThird"
                        label="Passed Second or Third Exam"
                        value={studentFormValues.passedSecondOrThird}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Checkbox 
                        name="employed"
                        label="Employed"
                        value={studentFormValues.employed}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Input 
                        name="position"
                        label="Employment Position"
                        value={studentFormValues.position}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="placeOfEmployment"
                        label="Place of Employment"
                        value={studentFormValues.placeOfEmployment}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="employmentAddress"
                        label="Employment Address"
                        value={studentFormValues.employmentAddress}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="startingWage"
                        label="Starting Wage"
                        value={studentFormValues.startingWage}
                        onChange={handleInputChange}
                    />
                    <Styles.RadioGroup
                        name="hoursWorked"
                        label="Hours Worked"
                        value={studentFormValues.hoursWorked}
                        onChange={handleInputChange}
                        items={getHoursWorkedRadioItems()}
                    />
                    <Styles.Input 
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
                                    <Styles.CheckIcon />
                                </Styles.SuccessFab>

                                        : 

                                <Styles.Fab
                                    aria-label="save"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    <Styles.SaveIcon />
                                </Styles.Fab>

                            }
                            {
                                submitLoading && (
                                <Styles.CircularProgress size={68} />
                                )
                            }
                        </Styles.ButtonBox>
                        <Styles.ButtonBox>
                            <Styles.Button
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
                            <Styles.Button
                                color="error"
                                text="Cancel"
                                onClick={handleEditCancel || handleCancel}
                            />
                        </Styles.ButtonBox>
                    </Styles.ButtonContainerBox>
                </Styles.Grid>
            </Styles.Grid>
        </Styles.StudentForm>
        <Styles.Modal
            modalTitle="Add Rotation"
            isModalOpen={isAddRotModalOpen}
            handleCloseModal={handleCloseAddRotModal}
        >
            <Styles.AddRotationForm 
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

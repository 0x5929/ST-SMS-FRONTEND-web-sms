import React from 'react';
import Styles from './styles'
import { AddRotationForm } from './AddRotationForm';

export function StudentForm(props) {


    const { 
            values, 
            errors, 
            handleInputChange, 
            handleCancel,
            handleSubmit,
            addRotModalOpen,
            addRotModalTitle,
            getCourseOptions,
            getRotationOptions,
            hoursWorkedRadioItems, 
            convertToDefaultEventParam,
            success,
            loading,


            handleAddRot,
            handleCloseAddRot,
            handleAddRotInputChange,
            handleAddRotSubmit,
            handleAddRotClear,
            rotationValues,
            rotationErrors,
            } = props


    return (
    <>
        <Styles.StudentForm onSubmit={handleSubmit}>
            <Styles.Grid container>
                <Styles.Grid item laptop={6} tablet={12}>
                    <Styles.Input 
                        name="studentId"
                        label="Student ID"
                        value={values.studentId}
                        onChange={handleInputChange}
                        error={errors.studentId}
                        
                    />
                    <Styles.Input 
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleInputChange}  
                        error={errors.firstName}
                        
                    />
                    <Styles.Input 
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleInputChange} 
                        error={errors.lastName}
                        
                    />
                    <Styles.Input 
                        name="phoneNumber"
                        label="Phone Number"
                        value={values.phoneNumber}
                        onChange={handleInputChange} 
                        error={errors.phoneNumber}
                        
                    />
                    <Styles.Input 
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange} 
                        error={errors.email}
                        
                    />
                    <Styles.Input 
                        name="mailingAddress"
                        label="Mailing Address"
                        value={values.mailingAddress}
                        onChange={handleInputChange}  
                        error={errors.mailingAddress}
                        
                    />
                    <Styles.Select
                        name="course"
                        label="Course"
                        onChange={handleInputChange}
                        options={getCourseOptions()}
                        error={errors.course}
                        value={values.course}
                        defaultValue={getCourseOptions()[0].value}
                    />
                    <Styles.Stack direction="row" spacing={1}>
                        <Styles.Select
                            name="rotation"
                            label="Rotation"
                            onChange={handleInputChange}
                            options={getRotationOptions(values.course)}
                            error={errors.rotation}
                            value={values.rotation}
                            defaultValue={getRotationOptions()[0].rotation}
                        />
                        <Styles.AddRotBtn size="medium" onClick={handleAddRot}>
                            <Styles.AddBoxIcon />
                        </Styles.AddRotBtn>
                    </Styles.Stack>
                    <Styles.DatePicker
                        name="startDate"
                        label="Program Start Date"
                        value={values.startDate}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={errors.startDate}
                    />
                    <Styles.DatePicker
                        name="completionDate"
                        label="Program Completion Date"
                        value={values.completionDate}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={errors.completionDate}
                    />
                    <Styles.DatePicker
                        name="dateEnrollmentAgreementSigned"
                        label="Date Enrollment Agreement Signed"
                        value={values.dateEnrollmentAgreementSigned}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        error={errors.dateEnrollmentAgreementSigned}
                        disableFuture
                    />
                    <Styles.Input 
                        name="thirdPartyPayerInfo"
                        label="Third Party Payer Info"
                        value={values.thirdPartyPayerInfo}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="courseCost"
                        label="Course Cost"
                        value={values.courseCost}
                        onChange={handleInputChange}
                        error={errors.courseCost}
                        
                    />
                    <Styles.Input 
                        name="chargesCharged"
                        label="Charges Charged"
                        value={values.chargesCharged}
                        onChange={handleInputChange}
                        error={errors.chargesCharged}
                        
                    />
                    <Styles.Input 
                        name="chargesPaid"
                        label="Charges Paid"
                        value={values.chargesPaid}
                        onChange={handleInputChange}
                        error={errors.chargesPaid}
                        
                    />
                </Styles.Grid>
                <Styles.Grid item laptop={6} tablet={12}>
                    <Styles.Checkbox 
                        name="graduated"
                        label="Graduated"
                        value={values.graduated}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Checkbox 
                        name="passedFirstExam"
                        label="Passed First Exam"
                        value={values.passedFirstExam}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Checkbox 
                        name="passedSecondOrThird"
                        label="Passed Second or Third Exam"
                        value={values.passedSecondOrThird}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Checkbox 
                        name="employed"
                        label="Employed"
                        value={values.employed}
                        onChange={handleInputChange}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                    />
                    <Styles.Input 
                        name="position"
                        label="Employment Position"
                        value={values.position}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="placeOfEmployment"
                        label="Place of Employment"
                        value={values.placeOfEmployment}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="employmentAddress"
                        label="Employment Address"
                        value={values.employmentAddress}
                        onChange={handleInputChange}
                    />
                    <Styles.Input 
                        name="startingWage"
                        label="Starting Wage"
                        value={values.startingWage}
                        onChange={handleInputChange}
                    />
                    <Styles.RadioGroup
                        name="hoursWorked"
                        label="Hours Worked"
                        value={values.hoursWorked}
                        onChange={handleInputChange}
                        items={hoursWorkedRadioItems}
                    />
                    <Styles.Input 
                        name="descriptionAttempts"
                        label="Comments"
                        value={values.descriptionAttempts}
                        onChange={handleInputChange}
                        multiline
                        rows={15}
                    />
                    
                    {/* submission buttons */}

                    <Styles.Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Styles.Box sx={{ m: 1, position: 'relative'}}>
                            {
                                success ? 
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
                                loading && (
                                <Styles.CircularProgress size={68} />
                                )
                            }
                        </Styles.Box>
                        <Styles.Box sx={{ position: 'relative'}}>
                            <Styles.Button
                                type="submit"
                                text="Submit"
                                disabled={loading}
                            />
                            {
                                loading && (
                                <Styles.ButtonCircularProgress size={24} />   
                                )
                            }
                        </Styles.Box>
                        <Styles.Box sx={{ position: 'relative'}}>
                            <Styles.Button
                                color="error"
                                text="Cancel"
                                onClick={handleCancel}
                            />
                        </Styles.Box>
                    </Styles.Box>
                </Styles.Grid>
            </Styles.Grid>
        </Styles.StudentForm>
        <Styles.Modal
            modalTitle={addRotModalTitle}
            openModal={addRotModalOpen}
            closeModal={handleCloseAddRot}
        >
            <AddRotationForm 
                handleAddRotInputChange={handleAddRotInputChange}
                handleAddRotSubmit={handleAddRotSubmit}
                handleAddRotClear={handleAddRotClear}
                rotationValues={rotationValues}
                rotationErrors={rotationErrors}
                getCourseOptions={getCourseOptions}
            />
        </Styles.Modal>
    </>
  )
}

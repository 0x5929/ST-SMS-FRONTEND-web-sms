import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Input, Select, DatePicker, Checkbox, RadioGroup } from './Inputs'
import { Button, IconButton } from './Button'
import SearchBar from './SearchBar'
import Form from './Form'
import Card from './Card'
import SimpleBackDrop from './Backdrop' 
import { styled } from '@mui/material/styles';

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



// const QueryForm = styled(Form)(( {theme} ) => ({
//     // '& .MuiGrid-spacing-xs-2' : {
//     //     marginRight: theme.spacing(0),
//     //     marginLeft: theme.spacing(0),
//     //     // display: 'none'
//     // }

// }));

const QuerySearchBar = styled(SearchBar)(( {theme} ) => ({
    flexGrow: 1,
    width: 100,
    fullWidth: true,
    marginLeft: theme.spacing(0)
}));

const QuerySelect = styled(Select)(( {theme} ) => ({
    marginLeft: theme.spacing(0),

    // '& 	.MuiGrid-root' : {
    //     marginRight: 0
    // }
}));

const DelButton = styled(Button)(( {theme} ) => ({

    margin: theme.spacing(0),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(0)
}));

const AddButton = styled(IconButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(4),
    fontSize: theme.spacing(2)
}));

const QueryButton = styled(IconButton)(( {theme} ) => ({
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(47),
    fontSize: theme.spacing(2)
}));


const ButtomGrid = styled(Grid)(({theme}) =>({
    margin: theme.spacing(5)
}))

export function QueryLayoutGrid(props) {

    const {
        textInput,
        handleClear,
        queryLabel,
        handleSubmit,
        getStats, 
        getQueryOptions,
        openBackdrop,
        queryOptions,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange
    } = props;

    return (
        <>
            <Form onSubmit={(e)=>(handleSubmit(e, queryOptions))}>
                <Grid container rowSpacing={0} columnSpacing={0}>
                        {

                            queryOptions.map((query, index) => (
                                <Grid container item xs={12} key={index} spacing={0}>
                                    <Grid item xs={9}>
                                        <QuerySearchBar 
                                            label={queryLabel}
                                            name={queryOptions[index]['query']}
                                            value={queryOptions[index]['value']}
                                            onChange={(e) => (handleQueryOnChange(e, index))}
                                            textInput={textInput}
                                            handleClear={handleClear}
                                        />

                                    </Grid>
                                    <Grid item xs={2}>                     
                                        <QuerySelect
                                            label="Query Options"
                                            name="options"
                                            value={queryOptions[index]['query']}
                                            onChange={(e)=>(handleQueryOptionOnChange(e, index))}
                                            options={getQueryOptions()}
                                            required
                                        />
                                    </Grid>
                                        {
                                            queryOptions.length !== 1 && (

                                                <Grid item xs={1}>                                
                                                    <DelButton 
                                                        text="Delete"
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={ ()=> (handleDelQuery(index))}
                                                    />             
                                                </Grid>
                                            )
                                        }              
                                        {
                                            queryOptions.length - 1 === index && (

                                                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>   
                                                    <AddButton
                                                        color="primary"
                                                        onClick={() => (handleAddNewQuery(index))}
                                                        variant="contained"
                                                    >
                                                        ADD NEW QUERY PARAMETER  
                                                        <AddCircleIcon 
                                                            fontSize="large"
                                                        />    
                                                    </AddButton> 
                                                    <QueryButton 
                                                        type="Submit"
                                                        color="secondary"
                                                        variant="outlined"
                                                    >
                                                        QUERY
                                                        <DoubleArrowIcon 
                                                            fontSize="large"
                                                        />
                                                    </QueryButton>
                            
                                                </Grid> 
                                            )

                                        }
     
                                </Grid>
                             ))

                        }
                        <Grid item justify="flex-end" xs={12}>

                        </Grid>
                    </Grid>
                </Form>

                
            <ButtomGrid container>
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
            </ButtomGrid>
            <SimpleBackDrop 
                openBackdrop={openBackdrop}
            />
        </>
    )
}
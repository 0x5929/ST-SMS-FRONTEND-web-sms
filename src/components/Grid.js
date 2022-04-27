import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Input from './Inputs/Input'
import Select from './Inputs/Select'
import DatePicker from './Inputs/DatePicker'
import Checkbox from './Inputs/Checkbox'
import RadioGroup from './Inputs/RadioGroup'
import Button  from './Button/Button'
import BaseIconButton from './Button/IconButton'
import SearchBar from './Searchbar/Searchbar'
import Form from './Form/Form'
import Card from './Card/Card'
import Image from './Image/Image'
import SimpleBackDrop from './Backdrop/Backdrop' 
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
            convertToDefaultEventParam
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
                
            />
            <Input 
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleInputChange}  
                error={errors.firstName}
                  
            />
            <Input 
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleInputChange} 
                error={errors.lastName}
                   
            />
            <Input 
                name="phoneNumber"
                label="Phone Number"
                value={values.phoneNumber}
                onChange={handleInputChange} 
                error={errors.phoneNumber}
                 
            />
            <Input 
                name="email"
                label="Email"
                value={values.email}
                onChange={handleInputChange} 
                error={errors.email}
                   
            />
            <Input 
                name="mailingAddress"
                label="Mailing Address"
                value={values.mailingAddress}
                onChange={handleInputChange}  
                error={errors.mailingAddress}
                  
            />
            <Select
                name="course"
                label="Course"
                onChange={handleInputChange}
                options={getCourseOptions()}
                error={errors.course}
                value={values.course}
                defaultValue={getCourseOptions()[0].value}
            />
            <DatePicker
                name="startDate"
                label="Program Start Date"
                value={values.startDate}
                onChange={handleInputChange}
                convertToDefaultEventParam={convertToDefaultEventParam}
                error={errors.startDate}
            />
            <DatePicker
                name="completionDate"
                label="Program Completion Date"
                value={values.completionDate}
                onChange={handleInputChange}
                convertToDefaultEventParam={convertToDefaultEventParam}
                error={errors.completionDate}
            />
            <DatePicker
                name="dateEnrollmentAgreementSigned"
                label="Date Enrollment Agreement Signed"
                value={values.dateEnrollmentAgreementSigned}
                onChange={handleInputChange}
                convertToDefaultEventParam={convertToDefaultEventParam}
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
                
            />
            <Input 
                name="chargesCharged"
                label="Charges Charged"
                value={values.chargesCharged}
                onChange={handleInputChange}
                error={errors.chargesCharged}
                
            />
            <Input 
                name="chargesPaid"
                label="Charges Paid"
                value={values.chargesPaid}
                onChange={handleInputChange}
                error={errors.chargesPaid}
                
            />
        </Grid>
        <Grid item md={6} sm={12}>
            <Checkbox 
                name="graduated"
                label="Graduated"
                value={values.graduated}
                onChange={handleInputChange}
                convertToDefaultEventParam={convertToDefaultEventParam}
            />
            <Checkbox 
                name="passedFirstExam"
                label="Passed First Exam"
                value={values.passedFirstExam}
                onChange={handleInputChange}
                convertToDefaultEventParam={convertToDefaultEventParam}
            />
            <Checkbox 
                name="passedSecondOrThird"
                label="Passed Second or Third Exam"
                value={values.passedSecondOrThird}
                onChange={handleInputChange}
                convertToDefaultEventParam={convertToDefaultEventParam}
            />
            <Checkbox 
                name="employed"
                label="Employed"
                value={values.employed}
                onChange={handleInputChange}
                convertToDefaultEventParam={convertToDefaultEventParam}
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




const QuerySearchBar = styled(SearchBar)(( {theme} ) => ({
    flexGrow: 1,
    width: 100,
    fullWidth: true,
    marginLeft: theme.spacing(0)
}));

const QuerySelect = styled(Select)(( {theme} ) => ({
    [theme.breakpoints.up('sm')] : {
        marginLeft: theme.spacing(0)
    },

    [theme.breakpoints.down('sm')] : {
        marginLeft: theme.spacing(2)
    }

}));

const DelButton = styled(Button)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(0)
}));

const AddButton = styled(Button)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(4),
    fontSize: theme.spacing(2)
}));

const QueryButton = styled(BaseIconButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(4),
    fontSize: theme.spacing(2)
}));


const ButtomGrid = styled(Grid)(({theme}) =>({
    marginRight: theme.spacing(5),
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
        handleQueryOptionOnChange,
        errors,
        schoolPicLoc,
        programPicLoc,
        rotationPicLoc,
        studentPicLoc
    } = props;

    return (
        <>
            <Form onSubmit={(e)=>(handleSubmit(e, queryOptions))}>
                <Grid container rowSpacing={0} columnSpacing={0}>
                        {

                            queryOptions.map((query, index) => (
                                <Grid container item sm={12} key={index} spacing={0}>
                                    <Grid item md={9} sm={12}>
                                        <QuerySearchBar 
                                            index={index}
                                            label={queryLabel}
                                            name={queryOptions[index]['query']}
                                            value={queryOptions[index]['value']}
                                            onChange={(e) => (handleQueryOnChange(e, index))}
                                            error={errors['value' + index.toString()]}
                                            textInput={textInput}
                                            handleClear={handleClear}
                                        />

                                    </Grid>
                                    <Grid item md={2} sm={12}>                     
                                        <QuerySelect
                                            label="Query By"
                                            name="options"
                                            value={queryOptions[index]['query']}
                                            onChange={(e)=>(handleQueryOptionOnChange(e, index))}
                                            error={errors['query' + index.toString()]}
                                            options={getQueryOptions()}
                                            sx={{ fontSize: 15}}
                                            variant={'standard'}
                                            autoWidth
                                        />
                                    </Grid>
                                        {
                                            queryOptions.length !== 1 && (

                                                <Grid item md={1} sm={12}>                                
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

                                                <Grid item sm={12}>   
                                                    <AddButton
                                                        text="ADD NEW QUERY PARAMETER"
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={() => (handleAddNewQuery(index))}
                                                    />
                                                </Grid> 
                                            )

                                        }

                                </Grid>
                             ))

                        }
                        <Grid item xs={12}>
                            <QueryButton 
                                type="Submit"
                                color="secondary"
                                variant="contained"
                            >
                                QUERY
                                <DoubleArrowIcon 
                                    fontSize="large"
                                />
                            </QueryButton>    
                        </Grid>     
                    </Grid>
                </Form>

                
            <ButtomGrid container>
                <Grid item md={3} sm={12}>
                    <Card 
                        title="School Statistics"
                        model="school"
                        stats={getStats.school()}
                    >
                        <Image 
                            alt="School image."
                            src={schoolPicLoc}
                        />

                    </Card>
                </Grid>
                <Grid item md={3} sm={12}>
                    <Card 
                        title="Program Statistics"
                        model="program"
                        stats={getStats.program()}
                    >
                        <Image 
                            alt="Program image."
                            src={programPicLoc}
                        /> 

                    </Card>
                </Grid>
                <Grid item md={3} sm={12}>
                    <Card 
                        title="Rotation Statistics"
                        model="rotation"
                        stats={getStats.rotation()}
                    >
                        <Image 
                            alt="Rotation image."
                            src={rotationPicLoc}
                        /> 
                    </Card>
                </Grid>
                <Grid item md={3} sm={12}>
                    <Card 
                        title="Student Statistics"
                        model="student"
                        stats={getStats.student()}
                    >                        
                        <Image 
                            alt="Student image."
                            src={studentPicLoc}
                        />                       
                    </Card>
                </Grid>
            </ButtomGrid>
            <SimpleBackDrop 
                openBackdrop={openBackdrop}
            />
        </>
    )
}
import React, { useRef, useState } from 'react'

import { 
    Box as MuiBox, 
    Stack as MuiStack } from '@mui/material';

import {
    Input2,
    Select2 } from '../Inputs'

import {  BaseButton as Button } from '../Buttons'



import { createRotationFormStyles } from './styles'

import { useValidations } from '../../hooks';
const Styles = createRotationFormStyles({MuiStack, MuiBox})


function RotationForm({ getCourseOptions, addRotHandlers, addRotStates, ...others }) {
    console.log('AddRotationForm component rendered')

    const {


        programName,
        showError,
        clearFields,
        rotationRef,

    } = addRotStates

    const {
        handleProgramNameChange,
        handleAddRotSubmit, 

        handleAddRotClear,

    } = addRotHandlers

    const validations = useValidations().useAddRotValidation2()

    return (
        <Styles.AddRotForm {...others}>
            <Styles.Stack>
                <Select2
                    name="programName"
                    label="Program Name"
                    options={getCourseOptions()}
                    value={programName}
                    defaultValue={getCourseOptions()[0].value}
                    handleChange={handleProgramNameChange}
                    errorHandler={validations.programName}
                    showError={showError}
                    clearFields={clearFields}
                />
                <Input2 
                    ref={rotationRef}
                    name="rotation"
                    label="Rotation Number"
                    errorHandler={validations.rotation}
                    showError={showError}
                    clearFields={clearFields}
                />
                <Styles.ButtonContainerBox>
                    <Button 
                        text="Submit"
                        type="submit"
                        onClick={(e)=>(handleAddRotSubmit(e, rotationRef))}
                    />
                    <Button 
                        text="Cancel"
                        color="error"
                        onClick={handleAddRotClear}
                    />
                </Styles.ButtonContainerBox>
            </Styles.Stack>
        </Styles.AddRotForm>
  )
}

export default React.memo(RotationForm)
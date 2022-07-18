import React from 'react'
import { 
    Box as MuiBox, 
    Stack as MuiStack } from '@mui/material'

import { createRotationFormStyles } from './styles'
import {
    Input,
    Select } from '../../components/Inputs'
import {  BaseButton as Button } from '../../components/Buttons'
import { useValidations } from '../../hooks'


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
                <Select
                    name="programName"
                    label="Program Name"
                    options={getCourseOptions()}
                    value={programName}
                    defaultValue={getCourseOptions()[0].value}
                    handleChange={handleProgramNameChange}
                    errorHandler={validations.programName}
                    showError={showError}
                />
                <Input 
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
                        onClick={(e)=>(handleAddRotSubmit(e))}
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
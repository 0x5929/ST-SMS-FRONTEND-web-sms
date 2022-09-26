import React from 'react'
import { 
    Box as MuiBox, 
    Stack as MuiStack } from '@mui/material'

import { createRotationFormStyles } from './styles'
import {
    Input,
    Select } from '../../components/Inputs'
import {  BaseButton as Button } from '../../components/Buttons'


const Styles = createRotationFormStyles({MuiStack, MuiBox})


function RotationForm({ getCourseOptions, addRotHandlers, addRotStates, ...others }) {
    console.log('AddRotationForm component rendered')

    const {

        rotFormValidations,
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
                    errorHandler={rotFormValidations.programName}
                    showError={showError}

                    data-testid="program-select"
                />
                <Input 
                    ref={rotationRef}
                    name="rotation"
                    label="Rotation Number"
                    errorHandler={rotFormValidations.rotation}
                    showError={showError}
                    clearFields={clearFields}

                    data-testid="rotation-number"
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
                        onClick={() => handleAddRotClear(programName, rotationRef)}
                    />
                </Styles.ButtonContainerBox>
            </Styles.Stack>
        </Styles.AddRotForm>
  )
}

export default React.memo(RotationForm)
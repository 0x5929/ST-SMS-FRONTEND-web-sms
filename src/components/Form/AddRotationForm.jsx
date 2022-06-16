import React from 'react'

import { 

    Box as MuiBox, 
    Stack as MuiStack,

} from '@mui/material';

import {
    Input,
    Select,
} from '../Inputs'

import {
    BaseButton as Button,

} from '../Buttons'



import { createAddRotFormStyles } from './styles'

const Styles = createAddRotFormStyles({MuiStack, MuiBox})


export function AddRotationForm(props) {

    const {
        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        rotationFormValues,
        rotationFormErrors,
        getCourseOptions,

        ...others
    } = props

    return (
        <Styles.AddRotForm onSubmit={(e)=>(handleAddRotSubmit(e))} {...others}>
            <Styles.Stack>
                <Select 
                    name="programName"
                    label="Program Name"
                    onChange={handleAddRotInputChange}
                    options={getCourseOptions()}
                    error={rotationFormErrors.programName}
                    value={rotationFormValues.programName}
                    defaultValue={getCourseOptions()[0].value}
                />
                <Input 
                    name="rotation"
                    label="Rotation Number"
                    value={rotationFormValues.rotation}
                    onChange={handleAddRotInputChange}
                    error={rotationFormErrors.rotation}
                />
                <Styles.ButtonContainerBox>
                    <Button 
                        text="Submit"
                        type="submit"
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

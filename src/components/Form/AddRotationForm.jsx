import React from 'react'
import Styles from './styles'

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
                <Styles.Select 
                    name="programName"
                    label="Program Name"
                    onChange={handleAddRotInputChange}
                    options={getCourseOptions()}
                    error={rotationFormErrors.programName}
                    value={rotationFormValues.programName}
                    defaultValue={getCourseOptions()[0].value}
                />
                <Styles.Input 
                    name="rotation"
                    label="Rotation Number"
                    value={rotationFormValues.rotation}
                    onChange={handleAddRotInputChange}
                    error={rotationFormErrors.rotation}
                />
                <Styles.ButtonContainerBox>
                    <Styles.Button 
                        text="Submit"
                        type="submit"
                    />
                    <Styles.Button 
                        text="Cancel"
                        color="error"
                        onClick={handleAddRotClear}
                    />
                </Styles.ButtonContainerBox>
            </Styles.Stack>
        </Styles.AddRotForm>
  )
}

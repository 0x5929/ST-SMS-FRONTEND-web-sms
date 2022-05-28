import React from 'react'
import Styles from './styles'

export function AddRotationForm(props) {

    const {
        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        rotationValues,
        rotationErrors,
        getCourseOptions
    } = props

    return (
        <Styles.AddRotForm onSubmit={(e)=>(handleAddRotSubmit(e))}>
            <Styles.Stack>
                <Styles.Select 
                    name="programName"
                    label="Program Name"
                    onChange={handleAddRotInputChange}
                    options={getCourseOptions()}
                    error={rotationErrors.programName}
                    value={rotationValues.programName}
                    defaultValue={getCourseOptions()[0].value}
                />
                <Styles.Input 
                    name="rotation"
                    label="Rotation Number"
                    value={rotationValues.rotation}
                    onChange={handleAddRotInputChange}
                    error={rotationErrors.rotation}
                />
                <Styles.Stack direction="row" spacing={1}>
                    <Styles.Button 
                        text="Submit"
                        type="submit"
                    />
                    <Styles.Button 
                        text="Cancel"
                        color="error"
                        onClick={handleAddRotClear}
                    />
                </Styles.Stack>
            </Styles.Stack>
        </Styles.AddRotForm>
  )
}

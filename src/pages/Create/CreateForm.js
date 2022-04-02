import React from 'react'
import { Grid } from '@mui/material';
import useForm from '../../controllers/create/createFormController'
import Controls from '../../components'



export default function CreateForm() {



    const {
        values, 
        // setValues,
        errors,
        // setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedItems
    } = useForm(true);



    return (
    <Controls.Form onSubmit={handleSubmit}>
        <Controls.CreateFormGrid
            Grid={Grid} 
            Controls={Controls}
            values={values}
            errors={errors}
            handleInputChange={handleInputChange}
            handleCancel={handleCancel}
            getCourseOptions={getCourseOptions}
            hoursWorkedItems={hoursWorkedItems}
        />
    </Controls.Form>
  )
}

import React from 'react'
import { Grid } from '@mui/material';
import useForm from '../../controllers/create/createFormController'



export default function CreateForm() {



    const {
        Controls,
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

// STOPPED IN VIDEO 9:00 mark https://www.youtube.com/watch?v=-XKaSCU0ZLM&ab_channel=CodAffection
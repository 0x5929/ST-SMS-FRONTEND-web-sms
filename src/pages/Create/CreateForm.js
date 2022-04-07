import React from 'react'
import useForm from '../../controllers/create/createFormController'
import Controls from '../../components'
import * as studentData from '../../data/studentData'



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
        hoursWorkedRadioItems
    } = useForm(true, studentData.initialStudentValues);



    return (
    <Controls.Form onSubmit={handleSubmit}>

        <Controls.StudentFormGrid
            values={values}
            errors={errors}
            handleInputChange={handleInputChange}
            handleCancel={handleCancel}
            getCourseOptions={getCourseOptions}
            hoursWorkedRadioItems={hoursWorkedRadioItems}
        />
    </Controls.Form>
  )
}

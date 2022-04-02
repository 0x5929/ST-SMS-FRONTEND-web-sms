import { useState } from 'react'

import * as studentRecordService from '../../services/SMSRecordService'
import validate from '../../controllers/create/createFormValidation'
import Controls from '../../components'

import * as studentData from '../../data/studentData'
// FORM STATE
export default function useForm(validateOnChange=false) {


    
    // form state
    const [values, setValues] = useState(studentData.initialStudentValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target

        // set value of the changed input, and add the rest of values obj
        setValues({
            ...values,
            [name] : value
        })
        
        if (validateOnChange)
        validate({[name]: value}, setErrors, errors)
        

    }

    const handleSubmit = e =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        if (validate(values, setErrors, errors)){
            studentRecordService.createRecord(values)
            handleCancel()
        }

    }



    const handleCancel = e =>{
        setValues(studentData.initialStudentValues)
        setErrors({})
    }


    const getCourseOptions = studentRecordService.getCourseOptions
    const { hoursWorkedItems } = studentData
    
    // return an obj that contains our state 
    return {
        Controls,
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedItems
    }
}



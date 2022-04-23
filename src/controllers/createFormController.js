import { useState , useCallback } from 'react'

import * as studentRecordService from '../services/SMSRecordService'
import validate from './validationController'
import * as studentData from '../data/studentData'

// FORM STATE
export default function useForm(validateOnChange=false, currentData=studentData.initialStudentValues, userFeedbackObj) {

    
    // form state
    const [values, setValues] = useState(currentData);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target

        // set value of the changed input, and add the rest of values obj
        setValues({
            ...values,
            [name] : value
        })
        
        if (validateOnChange)
        validate.validateCreateForm({[name]: value}, setErrors, errors)
        

    }



    const createOrUpdate = (record, resetForm) => {

        // notification on after form submission

        const {        
            setNotify,
            notify
        } = userFeedbackObj

        let op = undefined

        const recordIndexToEdit = studentRecordService.getRecordIndex(record)


        if (recordIndexToEdit === false){       
            studentRecordService.createRecord(record)
            op = 'Create'
        }
        else {
            studentRecordService.updateRecord(record, recordIndexToEdit)
            op = 'Update'
        }
        setNotify({
            isOpen: true,
            message: op + ' successful',
            type: 'success', 
            Transition: notify.Transition
        })
        resetForm()

    }

    const populateFormFieldsForEdit = useCallback((recordForEdit) => {
        if (recordForEdit != null){
            setValues({
                ...recordForEdit
            })
        }
    }, [])

    const handleCancel = e =>{
        setValues(studentData.initialStudentValues)
        setErrors({})
    }


    const handleSubmit = e =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        if (validate.validateCreateForm(values, setErrors, errors)){
            createOrUpdate(values, handleCancel)
            
        }

    }



    const getCourseOptions = studentRecordService.getCourseOptions
    const { hoursWorkedRadioItems } = studentData
    
    // return an obj that contains our state 
    return {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        populateFormFieldsForEdit,
    }
}



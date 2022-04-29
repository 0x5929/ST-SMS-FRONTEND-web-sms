import { useState , useCallback } from 'react'

import * as SMSRecordService from '../services/SMSRecordService'
import validate from './useValidation'

// FORM STATE
export default function useForm(validateOnChange=false, currentData=SMSRecordService.getInitialStudentValues(), userFeedbackObj) {

    
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
        
        if (validateOnChange){
            validate.useCreateValidation({[name]: value}, setErrors, errors)
        }

    }



    const createOrUpdate = (record, resetForm) => {

        // notification on after form submission

        const {        
            setNotify,
            notify
        } = userFeedbackObj

        let op = undefined

        const recordIndexToEdit = SMSRecordService.getRecordIndex(record)


        if (recordIndexToEdit === false){       
            SMSRecordService.createRecord(record)
            op = 'Create'
        }
        else {
            SMSRecordService.updateRecord(record, recordIndexToEdit)
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
        setValues(SMSRecordService.getInitialStudentValues())
        setErrors({})
    }


    const handleSubmit = e =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        if (validate.useCreateValidation(values, setErrors, errors)){
            createOrUpdate(values, handleCancel)
        }

    }



    const getCourseOptions = SMSRecordService.getCourseOptions
    const hoursWorkedRadioItems  = SMSRecordService.getHoursWorkedRadioItems()
    

    const convertToDefaultEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    })
    

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
        convertToDefaultEventParam
    }
}



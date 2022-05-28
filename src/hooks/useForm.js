import { useState, useEffect, useRef } from 'react'

import * as SMSRecordService from '../services/SMSRecordService'
import validate from './useValidation'

// FORM STATE
export default function useForm(
    validateOnChange=false, 
    currentData=SMSRecordService.getInitialStudentValues(), 
    userFeedbackObj,
    addRotObj,
    recordForEdit=null) {
        
    // form states 
    // consider refactor  using useReducer to help maintain states
    const [values, setValues] = useState(currentData);
    const [rotationValues, setRotationValues] = useState({programName: '', rotation: ''})
    const [errors, setErrors] = useState({});
    const [rotationErrors, setRotationErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const progressTimer = useRef();


    useEffect(()=>{
        /* this looks like it could violate the rule of hooks
            however, the condition statement really just separates the logics between two component/features that uses useForm hook (create and edit form)
            one will have recordForEdit, one will not. Two conditions are on two different states, 
            so hooks for each state will still be called the same order 
        **/
        if (recordForEdit !== null) {
            console.log('recordForEdit: ', recordForEdit)
            console.log('recordForEdit.rotation: ', recordForEdit.rotation)
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])
    

    // when StudentForm component mounts and unmounts, maybe do some data op during cleanup when after fetch backend data?
    useEffect(() => {
        return () => {
          clearTimeout(progressTimer.current);
        };
      }, []);


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

    // consider refactoring these into its own useAddRotForm() hook, and have the main useStudentForm() hook call it
    const handleAddRotInputChange = e => {
        const { name, value } = e.target

        setRotationValues({
            ...rotationValues,
            [name] : value
        })
    }

    const handleAddRotSubmit = e => {
        e.preventDefault()

        if (validate.useAddRotValidation(rotationValues, setRotationErrors, rotationErrors)){
            const {        
                setNotify,
                notify
            } = userFeedbackObj

            setNotify({
                isOpen: true,
                message: 'Rotation added successfully',
                type: 'success', 
                Transition: notify.Transition
            })

            setRotationValues({programName: '', rotation: ''})
            handleAddRotClear()
            handleCloseAddRot()
        }

    }

    const handleAddRotClear = () => {
        setRotationValues({programName: '', rotation: ''})
        setRotationErrors({})
 
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

            // in reality createRecord should return a promise, and will take a callback function as input
            // here instead, we will just pass in window.setTimeout
            handleProgress(window.setTimeout)
            op = 'Create'
            SMSRecordService.createRecord(record)
        }
        else {
            // in reality createRecord should return a promise, and will take a callback function as input
            // here instead, we will just pass in window.setTimeout
            handleProgress(window.setTimeout)
            op = 'Update'
            SMSRecordService.updateRecord(record, recordIndexToEdit)
        }
        setNotify({
            isOpen: true,
            message: op + ' successful',
            type: 'success', 
            Transition: notify.Transition
        })
        resetForm()

        console.log(op, ' success with: ', record)
    }



    const handleCancel = e =>{
        setValues(SMSRecordService.getInitialStudentValues())
        setErrors({})
        setSuccess(false)
    }




    const handleProgress = (callback) => {
        if (!loading) {

            setSuccess(false);
            setLoading(true);
            
            // this would be connected to axio to fetch back end API, instead of using a timeout callback
            progressTimer.current = callback(() => {
              setSuccess(true);
              setLoading(false);
            }, 2000);
          }
    }


    const handleSubmit = e =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        if (validate.useCreateValidation(values, setErrors, errors)){
            createOrUpdate(values, handleCancel)
        }

    }

    const handleAddRot = () =>{
        const { openAddRotModal } = addRotObj
        openAddRotModal()
    }

    const handleCloseAddRot = () => {
        const { closeAddRotModal } = addRotObj
        closeAddRotModal()
    }

    const  {getCourseOptions, getRotationOptions } = SMSRecordService
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
        errors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,
        success,
        loading,


        handleAddRot,
        handleCloseAddRot,
        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        rotationValues,
        rotationErrors,
    }
}



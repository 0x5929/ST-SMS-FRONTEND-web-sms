import { useState, useEffect, useRef, useReducer } from 'react'

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
    // const [values, setValues] = useState(currentData);
    // const [rotationValues, setRotationValues] = useState({programName: '', rotation: ''})
    // const [errors, setErrors] = useState({});
    // const [rotationErrors, setRotationErrors] = useState({})
    // const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false);
    const progressTimer = useRef();


    const initialStudentFormState = {
        studentFormValues: currentData,
        rotationFormValues: {programName: '', rotation: ''},
        studentFormErrors: {},
        rotationFormErrors: {},
        submitLoading: false,
        submitSuccess: false
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'set-studentFormValues': 
                return {...state, studentFormValues: action.payload}
            case 'set-rotationFormValues': 
                return {...state, rotationFormValues: action.payload}
            case 'set-studentFormErrors': 
                return {...state, studentFormErrors: action.payload}
            case 'set-rotationFormErrors': 
                return {...state, rotationFormErrors: action.payload}
            case 'set-submitLoading': 
                return {...state, submitLoading: action.payload}
            case 'set-submitSuccess': 
                return {...state, submitSuccess: action.payload}
            case 'clear-rotationForm' : 
                return {
                    ...state, 
                    rotationFormValues: initialStudentFormState.rotationFormValues,
                    rotationFormErrors: initialStudentFormState.rotationFormErrors
                }
            case 'clear-studentForm' : 
                return {
                    ...state,
                    studentFormValues: initialStudentFormState.studentFormValues,
                    studentFormErrors: initialStudentFormState.studentFormErrors,
                    submitSuccess: initialStudentFormState.submitSuccess
                }
            case 'form-submissionSuccess' : 
                return {
                    ...state, 
                    submitLoading : false,
                    submitSuccess: true
                }
                case 'form-submissionLoading' : 
                return {
                    ...state, 
                    submitLoading : true,
                    submitSuccess: false
                }
            default: 
                throw new Error('StudentForm State Reducer Error!');
        }
    }


    const [ studentFormState, studentFormDispatch ] = useReducer(reducer, initialStudentFormState)


    useEffect(()=>{

        if (recordForEdit !== null) {

            studentFormDispatch({type: 'set-studentFormValues', payload: {...recordForEdit}})
            // setValues({
            //     ...recordForEdit
            // })
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
        // setValues({
        //     ...values,
        //     [name] : value
        // })
        studentFormDispatch({type: 'set-studentFormValues', payload: {
            ...studentFormState.studentFormValues,
            [name] : value
        }})
        
        if (validateOnChange){
            validate.useCreateValidation({[name]: value}, studentFormDispatch, studentFormState.studentFormErrors)
        }
    }

    // consider refactoring these into its own useAddRotForm() hook, and have the main useStudentForm() hook call it
    const handleAddRotInputChange = e => {
        const { name, value } = e.target

        // setRotationValues({
        //     ...rotationValues,
        //     [name] : value
        // })

        studentFormDispatch({type: 'set-rotationFormValues', payload: {
            ...studentFormState.rotationFormValues,
            [name] : value
        }})
    }

    const handleAddRotSubmit = e => {
        e.preventDefault()

        if (validate.useAddRotValidation(studentFormState.rotationFormValues, studentFormDispatch, studentFormState.rotationFormErrors,)){
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

           // setRotationValues({programName: '', rotation: ''})

            //studentFormDispatch({type: 'set-rotationFormValues', payload: initialStudentFormState.rotationFormValues})
            handleAddRotClear()
            handleCloseAddRot()
        }

    }

    const handleAddRotClear = () => {
        // setRotationValues({programName: '', rotation: ''})
        //setRotationErrors({})
        studentFormDispatch({type: 'clear-rotationForm'})
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



    const handleCancel = e => {
        //setValues(SMSRecordService.getInitialStudentValues())
        // setErrors({})
        // setSuccess(false)
        studentFormDispatch({type: 'clear-studentForm'})
    }




    const handleProgress = (callback) => {
        if (!studentFormState.submitLoading) {

            // setSuccess(false);
            // setLoading(true);

            studentFormDispatch({type: 'form-submissionLoading'})
            
            // this would be connected to axio to fetch back end API, instead of using a timeout callback
            progressTimer.current = callback(() => {
            //   setSuccess(true);
            //   setLoading(false);
            studentFormDispatch({type: 'form-submissionSuccess'})
            }, 2000);
          }
    }


    const handleSubmit = e =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        if (validate.useCreateValidation(studentFormState.studentFormValues, studentFormDispatch, studentFormState.studentFormErrors)){
            createOrUpdate(studentFormState.studentFormValues, handleCancel)
        }

    }

    const handleAddRot = () =>{
        const { openAddRotModal } = addRotObj
        openAddRotModal()
    }

    const handleCloseAddRot = () => {
        const { closeAddRotModal } = addRotObj
        console.log('asdf')
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
        studentFormState,
        studentFormDispatch,
        // values, 
        // errors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,
        // success,
        // loading,

        
        handleAddRot,
        handleCloseAddRot,
        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        // rotationValues,
        // rotationErrors,
    }
}



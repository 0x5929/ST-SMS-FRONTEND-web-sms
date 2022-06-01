import { useState, useEffect, useRef, useReducer, useCallback } from 'react'

import * as SMSRecordService from '../services/SMSRecordService'
import { useAddRotationModal } from './useModals';
import validate from './useValidation'

// FORM STATE
export function useStudentForm(
    validateOnChange=false, 
    currentData=SMSRecordService.getInitialStudentValues(), 
    userFeedbackObj,
    recordForEdit=null) {
        
    // form states 
    const progressTimer = useRef();

    const initialStudentFormState = {
        studentFormValues: currentData,
        studentFormErrors: {},
        submitLoading: false,
        submitSuccess: false
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'set-studentFormValues': 
                return {...state, studentFormValues: action.payload}
            case 'set-studentFormErrors': 
                return {...state, studentFormErrors: action.payload}
            case 'set-submitLoading': 
                return {...state, submitLoading: action.payload}
            case 'set-submitSuccess': 
                return {...state, submitSuccess: action.payload}
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

        }
    }, [recordForEdit])
    

    // when StudentForm component mounts and unmounts, maybe do some data op during cleanup when after fetch backend data?
    useEffect(() => {
        return () => {
          clearTimeout(progressTimer.current);
        };
      }, []);


    const {
        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear
    } = useAddRotationForm()

    const handleInputChange = e => {
        const { name, value } = e.target

        studentFormDispatch({type: 'set-studentFormValues', payload: {
            ...studentFormState.studentFormValues,
            [name] : value
        }})
        
        if (validateOnChange){
            validate.useCreateValidation({[name]: value}, handleSetStudentFormErrorCallback, studentFormState.studentFormErrors)
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
        studentFormDispatch({type: 'clear-studentForm'})
    }




    const handleProgress = (callback) => {
        if (!studentFormState.submitLoading) {

            studentFormDispatch({type: 'form-submissionLoading'})
            
            // this would be connected to axio to fetch back end API, instead of using a timeout callback
            progressTimer.current = callback(() => {
            studentFormDispatch({type: 'form-submissionSuccess'})
            }, 2000);
          }
    }


    const handleSubmit = e =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        if (validate.useCreateValidation(studentFormState.studentFormValues, handleSetStudentFormErrorCallback, studentFormState.studentFormErrors)){
            createOrUpdate(studentFormState.studentFormValues, handleCancel)
        }

    }



    const  { getCourseOptions, getRotationOptions } = SMSRecordService
    const hoursWorkedRadioItems  = SMSRecordService.getHoursWorkedRadioItems()
    

    const convertToDefaultEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    })
    
    const handleClearStudentFormErrorCallback = useCallback(()=>{
        studentFormDispatch({type: 'set-studentFormErrors', payload: {}})
    }, [])

    const handleSetStudentFormErrorCallback = useCallback((temp)=>{
        studentFormDispatch({type: 'set-studentFormErrors', payload: {...temp}})
    }, [])

    // return an obj that contains our state 
    return {
        studentFormState,
        handleClearStudentFormErrorCallback,
        handleSetStudentFormErrorCallback,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,

        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear

    }
}


function useAddRotationForm(userFeedbackObj) {

    const [rotationFormValues, setRotationFormValues] = useState({programName: '', rotation: ''})
    const [rotationFormErrors, setRotationFormErrors] = useState({})

    const {
        isAddRotModalOpen,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        addRotModalTitle
    } = useAddRotationModal()


    // consider refactoring these into its own useAddRotForm() hook, and have the main useStudentForm() hook call it
    const handleAddRotInputChange = e => {
        const { name, value } = e.target

        setRotationFormValues({
            ...rotationFormValues,
            [name] : value
        })
    }
    
    const handleAddRotSubmit = e => {
        e.preventDefault()

        if (validate.useAddRotValidation(rotationFormValues, setRotationFormErrors, rotationFormErrors)){
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
            handleCloseAddRotModal()
        }

    }

    const handleAddRotClear = () => {
        setRotationFormValues({programName: '', rotation: ''})
        setRotationFormErrors({})
    }



    return {
        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear
    }
}

export function useQueryForm(){
    return {

    }
}
import { useState, useEffect, useRef, useReducer, useCallback } from 'react'

import { useAddRotationModal } from './useModals';
import useValidations from './useValidations'

import * as SMSRecordService from '../services/SMSRecordService'
import useToggle from './useToggle';

// FORM STATE
export function useStudentForm(
    validateOnChange=false, 
    currentData=SMSRecordService.getInitialStudentValues(), 
    userFeedbackObj,
    recordForEdit=null) {
        
    // form states 
    const progressTimer = useRef();

   // put this into useStudentForms(), and return from custom hook
   const inputRefs = {
    studentId: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
    mailingAddress: useRef(null),
    course: useRef(null),
    rotation: useRef(null),
    startDate: useRef(null),
    completionDate: useRef(null),
    dateEnrollmentAgreementSigned: useRef(null),
    thirdPartyPayerInfo: useRef(null),
    courseCost: useRef(null),
    chargesCharged: useRef(null),
    chargesPaid: useRef(null),
    graduated: useRef(null),
    passedFirstExam: useRef(null),
    passedSecondOrThird: useRef(null),
    employed: useRef(null),
    position: useRef(null),
    placeOfEmployment: useRef(null),
    employmentAddress: useRef(null),
    startingWage: useRef(null),
    hoursWorked: useRef(null),
    descriptionAttempts: useRef(null)
    
}



    const validations = useValidations().useCreateValidation2()
    const initialStudentFormState = {
        studentFormValues: currentData,
        studentFormErrors: {},
        showError: false,
        clearFields: false,
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
            case 'form-toggleShowErrors' : 
                return {
                    ...state,
                    showError: !state.showError
                }
            case 'form-toggleClearFields' : 
                return {
                    ...state,
                    clearFields: !state.clearFields
                }
            default: 
                throw new Error('StudentForm State Reducer Error!');
        }
    }


    const [ studentFormState, studentFormDispatch ] = useReducer(reducer, initialStudentFormState)
    const [ showError, handleToggleError ] = useToggle(false)
    const [ clearFields, handleToggleClearFields ] = useToggle(false)
    const { createValidation } = useValidations()

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


    const [addRotStates, addRotHandlers] = useAddRotationForm(userFeedbackObj)



    const handleCancel = useCallback( () => {

        studentFormDispatch({type: 'form-toggleClearFields'})
        // NOTE that the submission success and loading status should be in form level and not input level. 
        // this way in handleCancel, we can mark loading to be false, and success  to be false
        if (studentFormState.showError)
            
            studentFormDispatch({type:'form-toggleShowErrors'})
    }, [studentFormState.showError])

    const handleSetStudentFormErrorCallback = useCallback((temp)=>{
        studentFormDispatch({type: 'set-studentFormErrors', payload: {...temp}})
    }, [])

    const handleClearStudentFormErrorCallback = useCallback(()=>{
        studentFormDispatch({type: 'set-studentFormErrors', payload: {}})

        // added another dispatch so that submit success can be set to false, this is diff from clear-studentForm, 
        // because it doesn't clear the values for edit!! which is used by callback
        studentFormDispatch({type: 'set-submitSuccess', payload: false})
    }, [])


    const handleProgress = useCallback((callback) => {
        if (!studentFormState.submitLoading) {

            studentFormDispatch({type: 'form-submissionLoading'})
            
            // this would be connected to axio to fetch back end API, instead of using a timeout callback
            progressTimer.current = callback(() => {
            studentFormDispatch({type: 'form-submissionSuccess'})
            }, 2000);
          }
    }, [studentFormState.submitLoading])

    const _createOrUpdate = useCallback((record, resetForm) => {

        // notification on after form submission
        const {  notificationHandlers } = userFeedbackObj

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
        notificationHandlers.handleOpenNotification(op + ' successful')
        resetForm()

        console.log(op, ' success with: ', record)
    }, [handleProgress, userFeedbackObj])

    const  { getCourseOptions, getRotationOptions, getHoursWorkedRadioItems } = SMSRecordService
    

    const convertToDefaultEventParam = useCallback((name, value) => ({
        target: {
            name,
            value
        }
    }), [])
    
    const handleInputChange = useCallback(e => {
        const { name, value } = e.target

        studentFormDispatch({type: 'set-studentFormValues', payload: {
            ...studentFormState.studentFormValues,
            [name] : value
        }})
        
        if (validateOnChange){
            createValidation({[name]: value}, handleSetStudentFormErrorCallback, studentFormState.studentFormErrors)
        }

    }, [
        createValidation, 
        handleSetStudentFormErrorCallback, 
        studentFormState.studentFormErrors, 
        studentFormState.studentFormValues, 
        validateOnChange
    ])



    const handleSubmit = useCallback((e, inputRefs) =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        // validation logic
        let validationObj = {}
        
        // grab validation
        Object.keys(inputRefs).forEach(function(key) {
            // both objs have the same key
            if ( key in validations)
                validationObj[key] = validations[key](inputRefs[key].current.value)
        });

        if (checkForError(validationObj)) {

            let data = {}
            Object.keys(inputRefs).forEach(function(key) {
                data[key] = inputRefs[key].current.value

                if ( key === 'graduated' || key === 'employed' || key === 'passedFirstExam' || key === 'passedSecondOrThird' ) {
                    data[key] = inputRefs[key].current.checked
                }
            });

            _createOrUpdate(data, handleCancel)
        }

        function checkForError(validations) {
            let validationKeys = Object.keys(validations)
            for ( var i = 0; i < validationKeys.length; i++ ) {
                if (!isEmpty(validations[validationKeys[i]])) {
                    studentFormDispatch({type: 'form-toggleShowErrors'})
                    return false
                }
            }
            return true
        }

        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        

        // if (createValidation(studentFormState.studentFormValues, handleSetStudentFormErrorCallback, studentFormState.studentFormErrors)){
        //     _createOrUpdate(studentFormState.studentFormValues, handleCancel)
        // }


    }, [_createOrUpdate, handleCancel, validations])


    const studentFormStates = { 
        studentFormState, 
        // showError,
        // clearFields,
        inputRefs,
        addRotStates: {...addRotStates}
    }

    var studentFormHandlers = { 
        handleClearStudentFormErrorCallback,
        handleSetStudentFormErrorCallback,
        handleSubmit,
        handleCancel,
        convertToDefaultEventParam,
        getCourseOptions, 
        getRotationOptions, 
        getHoursWorkedRadioItems,

        addRotHandlers: {...addRotHandlers}

    }

    // return an obj that contains our state 
    return [studentFormStates, studentFormHandlers]
}


function useAddRotationForm(userFeedbackObj) {

    const { notificationHandlers } = userFeedbackObj

    const [rotationFormValues, setRotationFormValues] = useState({programName: '', rotation: ''})
    const [rotationFormErrors, setRotationFormErrors] = useState({})
    const [isAddRotModalOpen, addRotModalHandlers] = useAddRotationModal()
    const { addRotValidation } = useValidations()

    const handleAddRotInputChange = useCallback(e => {
        const { name, value } = e.target

        setRotationFormValues({
            ...rotationFormValues,
            [name] : value
        })
    }, [rotationFormValues])


    const handleAddRotClear = useCallback(() => {
        setRotationFormValues({programName: '', rotation: ''})
        setRotationFormErrors({})
    }, [])


    const handleAddRotSubmit = useCallback(e => {
        e.preventDefault()

        if (addRotValidation(rotationFormValues, setRotationFormErrors, rotationFormErrors)){

            notificationHandlers.handleOpenNotification('Rotation added successfully')

            handleAddRotClear()
            addRotModalHandlers.handleCloseAddRotModal()
        }

    }, [
        addRotValidation, 
        rotationFormValues, 
        rotationFormErrors, 
        notificationHandlers, 
        handleAddRotClear, 
        addRotModalHandlers
    ])


    const addRotStates = { rotationFormValues, rotationFormErrors, isAddRotModalOpen }
    const addRotHandlers = { handleAddRotSubmit, handleAddRotInputChange, handleAddRotClear,
        addRotModalHandlers: {...addRotModalHandlers}
    }

    return [addRotStates, addRotHandlers]
}





export function useQueryForm(){

    var textInput = useRef(null);

    const initialQueryFormState = {
        queryResults: [],
        queryFormErrors: {},
        showResults: false,
        isBackdropOpen: false,
        queryOptions: [{query: 'clast_name', value: '', pk: 0 }]
    }

    function reducer(state, action) {
        switch (action.type){
            case 'set-queryResults' : 
                return {...state, queryResults: action.payload}
            case 'set-queryFormErrors':
                return {...state, queryFormErrors: action.payload}
            case 'set-showResults': 
                return {...state, showResults: action.payload}
            case 'set-isBackdropOpen': 
                return {...state, isBackdropOpen: action.payload}
            case 'set-queryOptions' : 
                return {...state, queryOptions: action.payload}
            case 'form-backToQuery' :
                return {
                    ...state,
                    showResults: false,
                    isBackdropOpen: false
                }
            default: 
                throw new Error('QueryForm State Reducer Error!')
        }
    }


    const [ queryFormState, queryFormDispatch ] = useReducer(reducer, initialQueryFormState)
    const { queryValidation } = useValidations()

    const handleSetQueryFormErrorCallback = useCallback((temp)=>{
        queryFormDispatch({type: 'set-queryFormErrors', payload: {...temp}})
    }, [])

    const clearError = useCallback((pk) => {
        let errObj = {...queryFormState.queryFormErrors}

        if ( typeof pk != 'undefined'){
            delete errObj['query' + pk.toString()]
            delete errObj['value' + pk.toString()]
        }
        
        queryFormDispatch({type: 'set-queryFormErrors', payload: errObj})
    }, [queryFormState.queryFormErrors])

    const handleAddNewQuery = useCallback((index) =>{
        function newPk() {
            let lastElPk = queryFormState.queryOptions[ queryFormState.queryOptions.length - 1 ]['pk']
            return lastElPk + 1;
        }

        if (index > 3){
            return 
        }

        queryFormDispatch({type: 'set-queryOptions', payload: [...queryFormState.queryOptions, {query: '', value: '', pk: newPk()}]})

    },[queryFormState.queryOptions])


    const handleDelQuery = useCallback((index, pk) =>{
        // clear Errors
        clearError(pk)

        let queries = [...queryFormState.queryOptions]

        // setting queries to anything but the ones we are trying to delete
        queryFormDispatch({type: 'set-queryOptions', payload: queries.filter( item => item.pk !== pk )})

    }, [clearError, queryFormState.queryOptions])


    const handleQueryOnChange = useCallback((e, index) => {
        const { 
            value 
        } = e.target
        const queries = [...queryFormState.queryOptions]

        if (typeof index != 'undefined')
            queries[index].value = value;

        queryFormDispatch({type: 'set-queryOptions', payload: queries})

    }, [queryFormState.queryOptions])


    const handleQueryOptionOnChange = useCallback((e, index) =>{
        const { 
            value 
        } = e.target

        const queries = [...queryFormState.queryOptions]
        queries[index].query = value;

        queryFormDispatch({type: 'set-queryOptions', payload: queries})
    }, [queryFormState.queryOptions])

    const getQueryOptions = SMSRecordService.getQueryOptions



    const handleClear = useCallback((textInput, index, pk=null) =>{
        // textInput is not used here, because we have set the value of the searchbar/textField, so instead, we will manipulate the value from its state obj
        if (pk !== null) {
            clearError(pk)
            handleQueryOnChange({target: {name: '', value: ''}}, index)

        }
    }, [clearError, handleQueryOnChange])

    const handleBackdrop = useCallback(() =>{
        queryFormDispatch({type: 'set-isBackdropOpen', payload: true})

        setTimeout(()=> {
            queryFormDispatch({type: 'set-isBackdropOpen', payload: true})
            fetchResults()
        }, 1000)

        // this could be the async function to run, while we have badckdrop on
        function fetchResults() {
    
            handleClear(textInput)
            queryFormDispatch({type: 'set-showResults', payload: true})
            
        }
    }, [handleClear])



    const handleSubmit = useCallback((e, queryOptions) => {
        e.preventDefault()

        if (queryValidation(queryOptions, handleSetQueryFormErrorCallback, queryFormState.queryFormErrors)){
            // load sample data for result table for dev and testing
            SMSRecordService.insertSampleRecords()

            console.log('QUERY PARAM AND DATA: ', queryOptions)
            // send the queryOptions to backend API

            //setResults(SMSRecordService.getAllRecords())
            queryFormDispatch({type: 'set-queryResults', payload: SMSRecordService.getAllRecords()})
    
            handleBackdrop()            
        }
    }, [
        handleBackdrop, 
        handleSetQueryFormErrorCallback, 
        queryFormState.queryFormErrors, 
        queryValidation
    ])

    
    const handleBacktoQuery = useCallback(() => {
        queryFormDispatch({type: 'form-backToQuery'})
    }, [])


    const queryFormStates = { queryFormState, textInput }
    const queryFormHandlers = {
        getQueryOptions,
        handleClear,
        handleSubmit,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
        handleBacktoQuery,
    }

    return [queryFormStates, queryFormHandlers]

}
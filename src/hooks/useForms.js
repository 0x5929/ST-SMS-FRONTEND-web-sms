import { useState, useEffect, useRef, useReducer, useCallback } from 'react'

import { useAddRotationModal } from './useModals';
import validate from './useValidation'

import * as SMSRecordService from '../services/SMSRecordService'

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


    const [addRotStates, addRotHandlers] = useAddRotationForm(userFeedbackObj)

    const _createOrUpdate = (record, resetForm) => {

        // notification on after form submission
        const {        
            notificationHandlers,
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
        notificationHandlers.handleOpenNotification(op + ' successful')
        resetForm()

        console.log(op, ' success with: ', record)
    }

    const  { getCourseOptions, getRotationOptions, getHoursWorkedRadioItems } = SMSRecordService
    

    const convertToDefaultEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    })
    
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
            _createOrUpdate(studentFormState.studentFormValues, handleCancel)
        }

    }

    const handleCancel = e => {
        studentFormDispatch({type: 'clear-studentForm'})
    }


    const handleClearStudentFormErrorCallback = useCallback(()=>{
        studentFormDispatch({type: 'set-studentFormErrors', payload: {}})
    }, [])

    const handleSetStudentFormErrorCallback = useCallback((temp)=>{
        studentFormDispatch({type: 'set-studentFormErrors', payload: {...temp}})
    }, [])


    const studentFormStates = { 
        studentFormState, 
        addRotStates: {...addRotStates}
    }

    var studentFormHandlers = { 
        handleClearStudentFormErrorCallback,
        handleSetStudentFormErrorCallback,
        handleInputChange,
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

            notificationHandlers.handleOpenNotification('Rotation added successfully')

            handleAddRotClear()
            addRotModalHandlers.handleCloseAddRotModal()
        }

    }

    const handleAddRotClear = () => {
        setRotationFormValues({programName: '', rotation: ''})
        setRotationFormErrors({})
    }


    const addRotStates = { rotationFormValues, rotationFormErrors, isAddRotModalOpen }
    const addRotHandlers = { handleAddRotSubmit, handleAddRotInputChange, handleAddRotClear,
        addRotModalHandlers: {...addRotModalHandlers}
    }

    return [addRotStates, addRotHandlers]
}





export function useQueryForm(){

    var textInput = useRef(null);
    const queryLabel = 'Search Student Database'


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

    const handleAddNewQuery = (index) =>{
        function newPk() {
            let lastElPk = queryFormState.queryOptions[ queryFormState.queryOptions.length - 1 ]['pk']
            return lastElPk + 1;
        }

        if (index > 3){
            return 
        }

        queryFormDispatch({type: 'set-queryOptions', payload: [...queryFormState.queryOptions, {query: '', value: '', pk: newPk()}]})

    }


    const handleDelQuery = async (index, pk) =>{
        // clear Errors
        clearError(pk)

        let queries = [...queryFormState.queryOptions]

        // setting queries to anything but the ones we are trying to delete
        queryFormDispatch({type: 'set-queryOptions', payload: queries.filter( item => item.pk !== pk )})

    }


    const handleQueryOnChange = (e, index) => {
        const { 
            value 
        } = e.target
        const queries = [...queryFormState.queryOptions]

        if (typeof index != 'undefined')
            queries[index].value = value;

        queryFormDispatch({type: 'set-queryOptions', payload: queries})

    }


    const handleQueryOptionOnChange = (e, index) =>{
        const { 
            value 
        } = e.target

        const queries = [...queryFormState.queryOptions]
        queries[index].query = value;

        queryFormDispatch({type: 'set-queryOptions', payload: queries})
    }

    const getQueryOptions = SMSRecordService.getQueryOptions

    const clearError = (pk) => {
        let errObj = {...queryFormState.queryFormErrors}

        if ( typeof pk != 'undefined'){
            delete errObj['query' + pk.toString()]
            delete errObj['value' + pk.toString()]
        }
        
        queryFormDispatch({type: 'set-queryFormErrors', payload: errObj})
    }

    const handleClear = (textInput, index, pk=null) =>{
        // textInput is not used here, because we have set the value of the searchbar/textField, so instead, we will manipulate the value from its state obj
        if (pk !== null) {
            clearError(pk)
            handleQueryOnChange({target: {name: '', value: ''}}, index)

        }
    }

    const handleBackdrop = () =>{
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
    }

    const handleSubmit = (e, queryOptions) => {
        e.preventDefault()

        if (validate.useQueryValidation(queryOptions, handleSetQueryFormErrorCallback, queryFormState.queryFormErrors)){
            // load sample data for result table for dev and testing
            SMSRecordService.insertSampleRecords()

            console.log('QUERY PARAM AND DATA: ', queryOptions)
            // send the queryOptions to backend API

            //setResults(SMSRecordService.getAllRecords())
            queryFormDispatch({type: 'set-queryResults', payload: SMSRecordService.getAllRecords()})
    
            handleBackdrop()            
        }


    }

    const handleBacktoQuery = () => {
        queryFormDispatch({type: 'form-backToQuery'})
    }


    const handleSetQueryFormErrorCallback = useCallback((temp)=>{
        queryFormDispatch({type: 'set-queryFormErrors', payload: {...temp}})
    }, [])

    return {
        queryFormState,
        textInput,
        queryLabel,
        getQueryOptions,
        handleClear,
        handleSubmit,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
        handleBacktoQuery,

    }
}
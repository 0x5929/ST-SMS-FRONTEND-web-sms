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

    var textInput = useRef(null);
    const queryLabel = 'Search Student Database'

    // consider using useReducer hook to help manage states below
    // const [ results, setResults ] = useState([])
    // const [errors, setErrors] = useState({});
    // const [ showResults, setShowResults ] = useState(false)
    // const [ openBackdrop, setOpenBackdrop ] = useState(false)
    // const [ queryOptions, setQueryOptions ] = useState([{query: 'clast_name', value: '', pk: 100}])


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

        //setQueryOptions([...queryFormState.queryOptions, {query: '', value: '', pk: newPk()}])
        queryFormDispatch({type: 'set-queryOptions', payload: [...queryFormState.queryOptions, {query: '', value: '', pk: newPk()}]})

    }


    const handleDelQuery = async (index, pk) =>{
        // clear Errors
        clearError(pk)

        let queries = [...queryFormState.queryOptions]

        // setting queries to anything but the ones we are trying to delete
       // setQueryOptions(queries.filter( item => item.pk !== pk ) )
        queryFormDispatch({type: 'set-queryOptions', payload: queries.filter( item => item.pk !== pk )})

    }


    const handleQueryOnChange = (e, index) => {
        const { 
            //name, 
            value 
        } = e.target
        const queries = [...queryFormState.queryOptions]

        if (typeof index != 'undefined')
            queries[index].value = value;

        //setQueryOptions(queries)
        queryFormDispatch({type: 'set-queryOptions', payload: queries})

    }


    const handleQueryOptionOnChange = (e, index) =>{
        const { 
            //name, 
            value 
        } = e.target

        const queries = [...queryFormState.queryOptions]
        queries[index].query = value;

        //setQueryOptions(queries)
        queryFormDispatch({type: 'set-queryOptions', payload: queries})
    }

    const getQueryOptions = SMSRecordService.getQueryOptions

    const clearError = (pk) => {
        let errObj = {...queryFormState.queryFormErrors}

        if ( typeof pk != 'undefined'){
            delete errObj['query' + pk.toString()]
            delete errObj['value' + pk.toString()]
        }
        
        //setErrors(errObj)
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
        //setOpenBackdrop(true)
        queryFormDispatch({type: 'set-isBackdropOpen', payload: true})
        setTimeout(()=> {
            queryFormDispatch({type: 'set-isBackdropOpen', payload: true})
            fetchResults()
        }, 1000)

        // this could be the async function to run, while we have badckdrop on
        function fetchResults() {
    
            handleClear(textInput)
            //setShowResults(true)
            queryFormDispatch({type: 'set-showResults', payload: true})
            
        }
    }

    const handleSubmit = (e, queryOptions) => {
        e.preventDefault()

        if (validate.useQueryValidation(queryOptions, handleSetQueryFormErrorCallback, queryFormState.queryFormErrors)){
            // load sample data for result table for dev and testing
            SMSRecordService.insertSampleRecords()

            console.log('QUERY PARAM AND DATA: ', queryOptions)
            console.log('setting query results')
            // send the queryOptions to backend API

            //setResults(SMSRecordService.getAllRecords())
            queryFormDispatch({type: 'set-queryResults', payload: SMSRecordService.getAllRecords()})
    
            handleBackdrop()            
        }


    }

    const handleBacktoQuery = () => {
        // setShowResults(false)
        // setOpenBackdrop(false)
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
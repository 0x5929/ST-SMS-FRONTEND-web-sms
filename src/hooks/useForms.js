import { useState, useEffect, useRef, useReducer, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAddRotationModal } from './useModals';
import useValidations from './useValidations'
import useToggle from './useToggle'
import * as SMSRecordService from '../services/SMSRecordService'


function _checkForError(validations, callback) {
    let validationKeys = Object.keys(validations)
    for ( var i = 0; i < validationKeys.length; i++ ) {
        if (!_isEmpty(validations[validationKeys[i]])) {
            callback()
            return false
        }
    }
    return true

}

function _isEmpty(obj) {
    return Object.keys(obj).length === 0;
}



export function useSignInForm({ authed, user, login }) {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { from } = state || {}
    const signInFormValidations = useValidations().useLoginValidation()
    const [ showEmailError, setShowEmailError ] = useToggle(false)
    const [ clearEmailField, setClearEmailField ] = useToggle(false)
    const [ showPwError, setShowPwError ] = useToggle(false)
    const [ clearPwField, setClearPwField ] = useToggle(false)

    const inputRefs = {
        email: useRef(''),
        password: useRef(''),
        rememberMe: useRef('')

    }

    const handleSubmit = useCallback(e => {
        e.preventDefault()

        let validationObj = {}

        Object.keys(inputRefs).forEach(function(key) {
            if ( key in signInFormValidations ) {
                validationObj[key] = signInFormValidations[key](inputRefs[key].current.value)
            }
        });

        if (_checkForError(validationObj, () => { 
                setShowEmailError(true);
                setShowPwError(true)})
            ) {
            let data = {}

            Object.keys(inputRefs).forEach(function(key) {
                data[key] = inputRefs[key].current.value
            });

            login({ email: data.email, password: data.password })
        }

        //disabled lint because it wants inputRef to be part of the dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login, signInFormValidations])

    const handleClearText = useCallback((name) => {

        switch(name){
            case 'email':
                setShowEmailError(false)
                setClearEmailField(true)
                break
            case 'password':
                setShowPwError(false)
                setClearPwField(true)
                break
            default: 
                return
        }


    }, [setClearEmailField, setClearPwField, setShowEmailError, setShowPwError])


    useEffect(()=>{
        if (authed && user) {
            navigate(from?.pathname || '/query')
        }
        else {
            navigate('/')
        }
    }, [authed, user, navigate, from?.pathname])

    const loginStates = { 
        user, 
        inputRefs, 
        signInFormValidations, 
        showEmailError, 
        showPwError, 
        clearEmailField, 
        clearPwField }

    const loginHandlers = { handleSubmit, handleClearText }
    return [ loginStates, loginHandlers ]
}

export function useStudentForm(userFeedbackObj, recordForEdit=null) {
    const initialStudentFormState = {
        studentFormValues: SMSRecordService.getInitialStudentValues(),
        studentFormErrors: {},
        course: '',
        rotation: '',
        showError: false,
        clearFields: false,
        submitLoading: false,
        submitSuccess: false
    }

    const studentFormValidations = useValidations().useCreateValidation()
    const progressTimer = useRef()
    const [ studentFormState, studentFormDispatch ] = useReducer(reducer, initialStudentFormState)
    const [ addRotStates, addRotHandlers ] = useAddRotationForm(userFeedbackObj)
    const { getCourseOptions, getRotationOptions, getHoursWorkedRadioItems } = SMSRecordService
    


    const inputRefs = {
        studentId: useRef(null),
        firstName: useRef(null),
        lastName: useRef(null),
        phoneNumber: useRef(null),
        email: useRef(null),
        mailingAddress: useRef(null),
        startDate: useRef(new Date()),
        completionDate: useRef(new Date()),
        dateEnrollmentAgreementSigned: useRef(new Date()),
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
        descriptionAttempts: useRef(null),

        course: null,
        rotation: null,

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
            case 'set-course' : 
                return { ...state, course : action.payload }
            case 'set-rotation': 
                return { ...state, rotation: action.payload }
                
            default: 
                throw new Error('StudentForm State Reducer Error!');
        }
    }


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
        return record
    }, [handleProgress, userFeedbackObj])

    const convertToDefaultEventParam = useCallback((name, value) => ({
        target: {
            name,
            value
        }
    }), [])
    
    const resolveValue = useCallback((recordProp)=> {
        return recordForEdit ? recordForEdit[recordProp] : ''
    }, [recordForEdit])

    

    const handleClearError = useCallback(() => {
        if (studentFormState.showError) {
            studentFormDispatch({type: 'form-toggleShowErrors'})
        }
        studentFormDispatch({type: 'set-submitSuccess', payload: false})
    }, [studentFormState.showError])

    const handleCancel = useCallback( () => {

        studentFormDispatch({type: 'form-toggleClearFields'})
        // NOTE that the submission success and loading status should be in form level and not input level. 
        // this way in handleCancel, we can mark loading to be false, and success  to be false
        handleClearError()
    }, [handleClearError])



    const handleCourseChange = useCallback((e)=>{
        studentFormDispatch({type: 'set-course', payload: e.target.value})
    }, [])

    const handleRotationChange = useCallback((e)=> {
        studentFormDispatch({type: 'set-rotation', payload: e.target.value})
    }, [])

    const handleClearCourse = useCallback( ()=> {
        studentFormDispatch({type: 'set-course', payload: ''})
        studentFormDispatch({type: 'set-rotation', payload: ''})
    }, [])


    const handleSubmit = useCallback((e, inputRefs) =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        // validation logic
        let validationObj = {}

        // grab validation
        Object.keys(inputRefs).forEach(function(key) {
            // both objs have the same key
            if ( key in studentFormValidations) {

                if (key === 'course' || key === 'rotation'){

                    // try to think of a better way to achieve this. 
                    // one can just remove course and rotation from useRefs, BUT, how can we validate course?
                    validationObj[key] = recordForEdit ?  
                        studentFormValidations[key](recordForEdit[key]) : 
                        studentFormValidations[key](studentFormState[key])

                }
                else {

                    validationObj[key] = studentFormValidations[key](inputRefs[key].current.value)
                }
            }
        })

        if (_checkForError(validationObj, () => studentFormDispatch({type: 'form-toggleShowErrors'}))) {
            let data = {}
            Object.keys(inputRefs).forEach(function(key) {

                switch(key) {
                    case 'course': 
                        data[key] = studentFormState[key]
                        break;
                    case 'rotation': 
                        data[key] = studentFormState[key]
                        break;
                    case 'graduated':
                        data[key] = inputRefs[key].current.checked
                        break;
                    case 'employed':
                        data[key] = inputRefs[key].current.checked
                        break;
                    case 'passedFirstExam':
                        data[key] = inputRefs[key].current.checked
                        break;
                    case 'passedSecondOrThird':
                        data[key] = inputRefs[key].current.checked
                        break;

                    default: 
                        data[key] = inputRefs[key].current.value
                }


            });

            if (recordForEdit) {
                data.pk = recordForEdit.pk
                data.course = recordForEdit.course
                data.rotation = recordForEdit.rotation
            }

            return _createOrUpdate(data, handleCancel)
        } else {
            return recordForEdit
        }

    }, [_createOrUpdate, handleCancel, studentFormState, studentFormValidations, recordForEdit])

    // when StudentForm component mounts and unmounts, maybe do some data op during cleanup when after fetch backend data?
    useEffect(() => {
        return () => {
          clearTimeout(progressTimer.current);
        };
      }, 
    [])


    const studentFormStates = { 
        studentFormValidations,
        studentFormState, 
        recordForEdit,
        inputRefs,
        addRotStates: {...addRotStates}
    }

    var studentFormHandlers = { 
        resolveValue,
        handleClearError,
        handleClearCourse,
        handleCourseChange,
        handleRotationChange,
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
    const [ isAddRotModalOpen, addRotModalHandlers ] = useAddRotationModal()
    const [ programName, setProgramName ] = useState('')
    const [ showError, setShowError ] = useToggle(false)
    const [ clearFields, setClearFields ] = useToggle(false)
    const rotationRef = useRef(null)
    const rotFormValidations = useValidations().useAddRotValidation()

    const handleProgramNameChange = useCallback((e) => {
        setProgramName(e.target.value)
    }, [])


    const handleAddRotClear = useCallback((programName, rotationRef) => {

        if (programName === '' && rotationRef.current.value === '') {
            
            if (showError) {
                setShowError(false)
            }
            return
        }

        setClearFields(!clearFields)
        setProgramName('')
        setShowError(false)

    }, [showError, clearFields, setClearFields, setShowError])


    const handleAddRotSubmit = useCallback( e => {
        e.preventDefault()

        let validationObj = {
            programName: '',
            rotation: ''
        }

        Object.keys(validationObj).forEach(function(key) {
            if ( key === 'programName'){
                validationObj[key] = rotFormValidations[key](programName)
            }
            else if ( key === 'rotation' ) {
                validationObj[key] = rotFormValidations[key](rotationRef.current.value)
            }
        })

        if (_checkForError(validationObj, ()=> setShowError(true))) {
            let data = {}
            Object.keys(validationObj).forEach(function(key) {
                switch (key) {
                    case 'programName' : 
                        data[key] = programName
                        break;
                    case 'rotation' : 
                        data[key] = rotationRef.current.value
                        break;
                    default: 
                        return
                }
            });


            console.log('Rotation added successfully, ', data)
            notificationHandlers.handleOpenNotification('Rotation added successfully')
            handleAddRotClear()
            addRotModalHandlers.handleCloseAddRotModal()
        }



    }, [rotFormValidations, programName, setShowError, notificationHandlers, handleAddRotClear, addRotModalHandlers])


    const addRotStates = { rotFormValidations, isAddRotModalOpen, programName, showError, clearFields, rotationRef }
    const addRotHandlers = { handleAddRotSubmit, handleAddRotClear, handleProgramNameChange,
        addRotModalHandlers: {...addRotModalHandlers}
    }

    return [addRotStates, addRotHandlers]
}



export function useQueryForm({ setQueryResults, handleBackdrop }){

    var textInput = useRef(null)
    const [ queryOptions, setQueryOptions ] = useState([{query: 'clast_name', value: '', pk: 0}])
    const [ queryFormErrors, setQueryFormErrors ] = useState({})
    const { queryValidation } = useValidations()
    const getQueryOptions = SMSRecordService.getQueryOptions

    const handleSetQueryFormErrorCallback = useCallback((temp)=>{
        setQueryFormErrors({...temp})
    }, [])

    const clearError = useCallback((pk) => {
        let errObj = {...queryFormErrors}

        if ( typeof pk != 'undefined'){
            delete errObj['query' + pk.toString()]
            delete errObj['value' + pk.toString()]
        }
        
        setQueryFormErrors(errObj)
    }, [queryFormErrors])

    const handleAddNewQuery = useCallback((index) =>{
        function newPk() {
            let lastElPk = queryOptions[ queryOptions.length - 1 ]['pk']

            return lastElPk + 1;
        }

        if (index > 3){
            return 
        }

        setQueryOptions([...queryOptions, {query: '', value: '', pk: newPk()}])

    }, [queryOptions])


    const handleDelQuery = useCallback((index, pk) =>{
        // clear Errors
        clearError(pk)

        let queries = [ ...queryOptions ]

        // setting queries to anything but the ones we are trying to delete
        setQueryOptions(queries.filter( item => item.pk !== pk ))

    }, [clearError, queryOptions])


    const handleQueryOnChange = useCallback((e, index) => {
        const { 
            value 
        } = e.target

        const queries = [...queryOptions]

        if (typeof index != 'undefined')
            queries[index].value = value;

        setQueryOptions(queries)

    }, [queryOptions])

    const handleQueryOptionOnChange = useCallback((e, index) =>{
        const { 
            value 
        } = e.target

        const queries = [...queryOptions]
        queries[index].query = value;

        setQueryOptions(queries)
    }, [queryOptions])



    const handleClear = useCallback((textInput, index, pk=null) =>{
        // textInput is not used here, because we have set the value of the searchbar/textField, so instead, we will manipulate the value from its state obj
        if (pk !== null) {
            clearError(pk)
            handleQueryOnChange({target: {name: '', value: ''}}, index)
        }
        
    }, [clearError, handleQueryOnChange])



    const handleSubmit = useCallback((e, queryOptions) => {
        e.preventDefault()

        if (queryValidation(queryOptions, handleSetQueryFormErrorCallback, queryFormErrors)){
            // load sample data for result table for dev and testing
            SMSRecordService.insertSampleRecords()

            console.log('QUERY PARAM AND DATA: ', queryOptions)
            // send the queryOptions to backend API

            setQueryResults(SMSRecordService.getAllRecords())    
            handleBackdrop()            
        }
    },  [handleBackdrop, handleSetQueryFormErrorCallback, queryFormErrors, queryValidation, setQueryResults])


    
    const queryFormStates = { queryOptions, queryFormErrors, textInput }
    const queryFormHandlers = {
        getQueryOptions,
        handleClear,
        handleSubmit,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
    }

    return [queryFormStates, queryFormHandlers]

}

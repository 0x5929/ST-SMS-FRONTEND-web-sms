import { useState, useEffect, useRef, useReducer, useMemo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAddRotationModal, useValidations, useToggle, useRefreshToken, useAuthedAxios, useCircularProgress } from './index'
import * as axioService from '../services/api/djREST'
import * as studentData from '../services/data/studentData'


function _isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function useSignInForm({ setAuthed, setUser, authed, user, login }) {
    const mountedRef = useRef(true)
    const refresh = useRefreshToken()
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

    const handleSubmit = useCallback(async e => {
        e.preventDefault()

        // construct data
        var requestData = {}

        for (let key in inputRefs) {
            requestData[key] = inputRefs[key].current.value
        }

        // check for error
        var hasError = false
        for (let key in requestData) {
            if (key in signInFormValidations) {
                let validationFunc = signInFormValidations[key]

                if (!_isEmpty(validationFunc(requestData[key]))) {
                    hasError = true
                    break
                }
            }
        }

        if (hasError) {
            setShowEmailError(true)
            setShowPwError(true)
        }
        else {
            try {
                await login({ email: requestData.email, password: requestData.password })
            }
            catch (err) {
                console.error(err)
            }
        }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClearText = (name) => {
        if (name === 'email') {
            setShowEmailError(false)
            setClearEmailField()
        }
        else if (name === 'password') {
            setShowPwError(false)
            setClearPwField()
        }

    }


    // similarly to our PersistentLogin logic inside protected routes
    useEffect(() => {

        (async () => {
            try {
                const accessCode = await refresh()
                
                if (!mountedRef.current) return null

                // change of authed and user will trigger the very next useEffect below
                setAuthed(true)
                setUser(prev => {
                    return { ...prev, accessToken: accessCode }
                })
    
            }
            catch (err) {
                // do nothing when we cannot refresh the accessToken, leave at login page
            }
                
        })()



        return () => {
            mountedRef.current = false
        }

    // everytime the component mounts, we need to see if we have previously been authenticated
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // everytime authed and or user is altered, we need to either navigate to /query to back to login at /
    useEffect(()=>{
        if (authed && user?.accessToken) {
            // default goes to /query page
            navigate(from?.pathname || '/query')
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

    // setting initial student form states for reducer
    const initialStudentFormState = {
        schoolOptions: [],
        courseOptions: [],
        rotationOptions: [],
        school: '',
        course: '',
        rotation: '',
        showError: false,
        clearFields: false,
        submitLoading: false,
        submitSuccess: false,
        rotationAdded: false,
    }
    const mountedRef = useRef(true)
    const studentFormValidations = useValidations().useCreateValidation()
    const [ studentFormState, studentFormDispatch ] = useReducer(reducer, initialStudentFormState)
    const [ addRotStates, addRotHandlers ] = useAddRotationForm(userFeedbackObj, studentFormState.school, studentFormDispatch, recordForEdit)
    const [ progressOn, handleSetProgressStatus ] = useCircularProgress()
    const authedAxios = useAuthedAxios()
    const {  notificationHandlers } = userFeedbackObj
    


    const inputRefs = {
        school: useRef(null),
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

    }


    function reducer(state, action) {
        switch (action.type) {
 
            case 'set-schoolOptions': 
                return {...state, schoolOptions: action.payload}
            case 'set-courseOptions': 
                return {...state, courseOptions: action.payload}
            case 'set-rotationOptions': 
                return {...state, rotationOptions: action.payload}
            case 'set-school': 
                return { ...state, school: action.payload}
            case 'set-course': 
                return { ...state, course : action.payload }
            case 'set-rotation': 
                return { ...state, rotation: action.payload }
            case 'set-submitLoading': 
                return {...state, submitLoading: action.payload}
            case 'set-submitSuccess': 
                return {...state, submitSuccess: action.payload}
            case 'set-rotationAdded': 
                return {...state, rotationAdded: action.payload}
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
                    showError: action.payload
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

    const schoolRadioDefaultValue = useMemo(() => {
        if (studentFormState.schoolOptions.length > 0)
            return studentFormState.schoolOptions[0]['value']

    }, [studentFormState.schoolOptions])


    const handleProgress = useCallback(async (callback, record) => {
        if (!studentFormState.submitLoading) {

            studentFormDispatch({type: 'form-submissionLoading'})

            try {
                const response = await callback(authedAxios, record)
                studentFormDispatch({type: 'form-submissionSuccess'})
                return response

            }
            catch(err) {
                console.error(err)
                studentFormDispatch({type: 'set-submitLoading', payload: false})
                studentFormDispatch({type: 'set-submitSuccess', payload: false})

                throw err
            }
        }
    }, [authedAxios, studentFormState.submitLoading])

    // this function is dependent on a state, which changes
    // if the state changes, the signature of this function changes
    // and this function is a dependent of handleCancel, but without useCallback, this will change on every render, 
    // and we only care about change after state changed
    const handleClearError = useCallback(() => {
        if (studentFormState.showError) {
            studentFormDispatch({type: 'form-toggleShowErrors', payload: false})
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


    const requestProcessing = useCallback(async (record, resetForm, isEdit ) => {
        let op = undefined
        let response

        try {

            if (isEdit === false){

                op = 'Create'
                response = await handleProgress(axioService.studentCreatePOST, record)
            }   
            else {
                op = 'Update'
    
                response = await handleProgress(axioService.studentEditPATCH, record)
            }
    
    
            notificationHandlers.handleOpenNotification(op + ' successful', 'success')
            resetForm()
    
            return response
        }
        catch (err) {
            console.error(err)
            notificationHandlers.handleOpenNotification(op + ' unsuccessful', 'error')
            throw err

        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const convertToDefaultEventParam = useCallback((name, value) => ({
        target: {
            name,
            value
        }
    }), [])
    
    const resolveValue = useCallback((recordProp)=> {
        return recordForEdit ? recordForEdit[recordProp] : ''
    }, [recordForEdit])


    const handleSubmit =  useCallback(async (e, inputRefs) =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        let isEdit = false

        // construct data
        var requestData = {}

        // first take care of edit form data
        if (recordForEdit) {
            isEdit = true

            requestData.pk = recordForEdit.pk
            requestData.school = studentFormState.school
            requestData.course = studentFormState.course
            requestData.rotation = studentFormState.rotation
        }
        else {
            requestData.course = studentFormState.course
            requestData.rotation = studentFormState.rotation
        }

        for (let key in inputRefs) {
            if (key === 'school') {
                requestData[key] = requestData[key] ? requestData[key] : inputRefs[key].current.value
            }
            else if (key === 'graduated' || key === 'employed' || key === 'passedFirstExam' || key === 'passedSecondOrThird') {
                requestData[key] = inputRefs[key].current.checked
            }
            else if (key === 'startingWage') {
                requestData[key] = inputRefs[key].current.value ? inputRefs[key].current.value : '0.00'
            }
            else {
                requestData[key] = inputRefs[key].current.value
            } 
        }


        // check for error
        var hasError = false
        for (let key in requestData) {
            if (key in studentFormValidations) {
                let validationFunc = studentFormValidations[key]
                if (!_isEmpty(validationFunc(requestData[key]))) {
                    hasError = true
                    break
                }
            }
        }

        // if there are error, return execution to app, aka do nothing
        if (hasError) {
           studentFormDispatch({type : 'form-toggleShowErrors', payload: true})
           return recordForEdit
        }
        else {
            try {
                return await requestProcessing(requestData, handleCancel, isEdit)
            }
            catch (err) {
                console.error(err)
                throw err
            }
 
        }

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleCancel, requestProcessing, recordForEdit, studentFormState.school, studentFormState.course, studentFormState.rotation])

    // on component dismount, set mountRef to be false, so that all api calls are not set as state
    useEffect(() => {

        return () => {
            mountedRef.current = false
        }
    }, [])



    // SETUP for studentForm
    // when studentForm is mounted, we need to check for school
    // either create: get all school value possible OR
    // edit: get current user school value (note cannot edit school value when editting, this will become messy)
    // if needed, user can create the same student in the different school
    useEffect(() => {
        const schoolOptionsFetchInCreate = async () => {

            try {

                const schoolOptions = await axioService.schoolOptionsCreateGET(authedAxios)
                if (!mountedRef.current) return null
                studentFormDispatch({type: 'set-schoolOptions', payload: schoolOptions})
            }
            catch(err) {
                console.error(err)
                notificationHandlers.handleOpenNotification('Something went wrong in create form', 'error')
                throw err
            }
        }


        const editFormPrep = async () => {

            try {
                // set school name for 
                const schoolName = await axioService.schoolOptionsEditGET(authedAxios, recordForEdit.rotation) 
                if (!mountedRef.current) return null
                studentFormDispatch({type: 'set-school', payload: schoolName})

                // clear course and rotation values
                studentFormDispatch({type: 'set-course', payload: ''})
                studentFormDispatch({type: 'set-rotation', payload: ''})

                // set course options
                const courses = await axioService.programNameGET(authedAxios, schoolName)
                studentFormDispatch({type: 'set-courseOptions', payload: courses})

                // set course
                studentFormDispatch({type: 'set-course', payload: recordForEdit.course})

                // set rotation Options
                const rotations = await axioService.rotationNumberGET(authedAxios, recordForEdit.course, schoolName)
                studentFormDispatch({type: 'set-rotationOptions', payload: rotations})
            
                // set rotation
                const rotationNumber = await axioService.rotationNumberByUUIDGET(authedAxios, recordForEdit.rotation)
                studentFormDispatch({type: 'set-rotation', payload: rotationNumber})
            }
            catch(err) {
                console.error(err)
                notificationHandlers.handleOpenNotification('Something went wrong in edit form', 'error')
                throw err
            }
 
        }

         // if not edit we should be in create mode, then we must grab all possible school values that user can fetch
        if (!recordForEdit) {
            handleSetProgressStatus({progressState: true})
            handleSetProgressStatus({callback: schoolOptionsFetchInCreate, callbackArgs: [], progressState: false})

        }
        // if we are editting, prepare forms, fetch school name first to get the correct course and rotation value
        // note in StudentForm.jsx, if editting, school field wont show& course field is not mutable
        else {
            handleSetProgressStatus({progressState: true})
            handleSetProgressStatus({callback: editFormPrep, callbackArgs: [], progressState: false})

        }

    // all changes in recordForEdit will have a diff api call depending if we are editting or not
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordForEdit])


    // two useEffects below will be triggered on Create view not Edit view
    // fetches course options for student form when loaded
    useEffect(() => {

        (async () => {
            try {
                if (!recordForEdit) {
                    
                    const courses = await axioService.programNameGET(authedAxios, studentFormState.school)
                    if (!mountedRef.current) return null
                    studentFormDispatch({type: 'set-course', payload: ''})
                    studentFormDispatch({type: 'set-rotation', payload: ''})
                    studentFormDispatch({type: 'set-courseOptions', payload: courses})
        
                }
            }
            catch (err) {
                console.error(err)
                notificationHandlers.handleOpenNotification('Something went wrong in fetching course options', 'error')
            }
        })()


    // this will be triggered when the school state value is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentFormState.school])


    // fetches rotation option for studfentform, whenever courseValue changes, this needs to re-fetch
    // when courseOptions change, it means the school changed, and rotation values should change too
    // when course change, of course the rotation values will change
    useEffect(() => {

        (async () => {
            try {
                if (!recordForEdit) {
                    
                    const rotations = await axioService.rotationNumberGET(authedAxios, studentFormState.course, studentFormState.school)
                    if (!mountedRef.current) return null
                    studentFormDispatch({type: 'set-rotation', payload: ''})
                    studentFormDispatch({type: 'set-rotationOptions', payload: rotations})
        
                }
            }
            catch (err) {
                console.error(err)
                notificationHandlers.handleOpenNotification('Something went wrong in fetching rotation options', 'error')
            }
        })()

            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentFormState.course, studentFormState.courseOptions])


    // only run with rotationAdded is set true from rotationForm, refresh rotationList for current selected course, 
    // reset rotation value and reset rotationAdded back to false
    useEffect(() => {

        (async () => {
            try {
                var rotations
                
                if (studentFormState.rotationAdded === true) {
                    if (!recordForEdit) {
                        rotations = await axioService.rotationNumberGET(authedAxios, studentFormState.course, studentFormState.school)
                    }
                    else {
                        const schoolName = await axioService.schoolOptionsEditGET(authedAxios, recordForEdit.rotation) 
                        rotations = await axioService.rotationNumberGET(authedAxios, recordForEdit.course, schoolName)
                    }
                    if (!mountedRef.current) return null
                    studentFormDispatch({type: 'set-rotation', payload: ''})
                    studentFormDispatch({type: 'set-rotationOptions', payload: rotations})
                    studentFormDispatch({type: 'set-rotationAdded', payload: false})
                }
            }
            catch (err) {
                console.error(err)
                notificationHandlers.handleOpenNotification('Something went wrong in re-fetching rotation options', 'error')
            }
        })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentFormState.rotationAdded])


    // whenever studentFormState.clearField changes, we need to also clear program and rotation select fields
    useEffect(()=>{
        handleClearCourse() 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentFormState.clearFields])


    const studentFormStates = { 
        studentFormState,
        studentFormValidations,
        inputRefs,
        schoolRadioDefaultValue,
        recordForEdit,
        progressOn,
        hoursWorkedItems: studentData.hoursWorkedRadioItems,

        addRotStates: {...addRotStates}
    }

    var studentFormHandlers = { 
        resolveValue,
        handleClearError,
        handleCourseChange,
        handleRotationChange,
        handleSubmit,
        handleCancel,
        convertToDefaultEventParam,
        studentFormDispatch,

        addRotHandlers: {...addRotHandlers}
    }

    // return an obj that contains our state 
    return [studentFormStates, studentFormHandlers]
}

function useAddRotationForm(userFeedbackObj, schoolName, studentFormDispatch, recordForEdit) {

    const mountedRef = useRef(true)
    const { notificationHandlers } = userFeedbackObj
    const [ isAddRotModalOpen, addRotModalHandlers ] = useAddRotationModal()
    const [ programName, setProgramName ] = useState('')
    const [ showError, setShowError ] = useToggle(false)
    const [ clearFields, setClearFields ] = useToggle(false)
    const rotationRef = useRef(null)
    const rotFormValidations = useValidations().useAddRotValidation()
    const [ progressOn, handleSetProgressStatus ] = useCircularProgress()
    const authedAxios = useAuthedAxios()

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

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showError, clearFields])


    const handleAddRotSubmit = useCallback( async e => {
        e.preventDefault()


        var hasError = false
        var requestData = {
            programName: programName,
            rotation: rotationRef.current.value
        }


        for (let key in requestData) {
            if (key in rotFormValidations) {
                let validationFunc = rotFormValidations[key]

                if (!_isEmpty(validationFunc(requestData[key]))) {
                    hasError = true
                    break
                }
            }
        }

        if (hasError) {
            setShowError(true)
        }
        else {
            try {
                // get school name
                const school = recordForEdit ? await axioService.schoolOptionsEditGET(authedAxios, recordForEdit.rotation) : schoolName

                // post rotation
                
                await handleSetProgressStatus({progressState: true})
                await handleSetProgressStatus({callback: axioService.rotationCreatePOST, callbackArgs: [authedAxios, requestData, school], progressState: false})


                notificationHandlers.handleOpenNotification('Rotation added successfully')
                addRotModalHandlers.handleCloseAddRotModal()

                // set state to trigger useEffect is useStudentForm
                if (!mountedRef.current) return null
                studentFormDispatch({type: 'set-rotationAdded', payload: true})

            }
            catch(e) {
                console.error(e)
                notificationHandlers.handleOpenNotification('Rotation added unsuccessfully', 'error')

            }
            finally {
                handleAddRotClear()
            }
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordForEdit, schoolName, programName, notificationHandlers, handleAddRotClear, addRotModalHandlers])



    useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, [])


    const addRotStates = { rotFormValidations, isAddRotModalOpen, programName, showError, clearFields, rotationRef, progressOn }
    const addRotHandlers = { handleAddRotSubmit, handleAddRotClear, handleProgramNameChange,
        addRotModalHandlers: {...addRotModalHandlers}
    }

    return [addRotStates, addRotHandlers]
}



export function useQueryForm({ setQueryResults, setShowResults, handleSetProgressStatus }){

    const  textInput = useRef(null)
    const mountedRef = useRef(true)
    const [ queryOptions, setQueryOptions ] = useState([{query: 'clast_name', value: '', pk: 0}])
    const [ queryFormErrors, setQueryFormErrors ] = useState({})
    const { queryValidation } = useValidations()
    const queryAvailOptions = studentData.queryOptions
    const authedAxios = useAuthedAxios()


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


    const handleSubmit = useCallback( async (e, queryOptions) =>  {
        e.preventDefault()


        const handleSetQueryFormErrorCallback = (temp) => {
            setQueryFormErrors({...temp})
        }

        if (queryValidation(queryOptions, handleSetQueryFormErrorCallback, queryFormErrors)){     
            try {
                // turn circular progress to true
                await handleSetProgressStatus({progressState: true})

                // then run callback and then return progress to false once finished
                const response = await handleSetProgressStatus({
                    callback: axioService.studentQueryGET, 
                    callbackArgs : [authedAxios, queryOptions], 
                    progressState: false
                })
                
                if (!mountedRef.current) return null
                setQueryResults(response)   
                setShowResults(true)
            }
            catch(err) {
                console.error(err)
            }
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [queryFormErrors])

    useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, [])
    const queryFormStates = { queryAvailOptions, queryOptions, queryFormErrors, textInput }
    const queryFormHandlers = {
        handleClear,
        handleSubmit,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
    }

    return [queryFormStates, queryFormHandlers]

}

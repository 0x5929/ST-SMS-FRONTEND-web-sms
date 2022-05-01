import { useState, useRef } from 'react'

import validate from './useValidation'
import * as studentService from '../services/SMSRecordService'


export default function useQuery() {

    var textInput = useRef(null);
    const queryLabel = 'Search Student Database'

    const [ results, setResults ] = useState([])
    const [errors, setErrors] = useState({});
    const [ showResults, setShowResults ] = useState(false)
    const [ openBackdrop, setOpenBackdrop ] = useState(false)
    const [ queryOptions, setQueryOptions ] = useState([{query: 'clast_name', value: '', pk: 10}])

    const schoolPicLoc = 'https://images.unsplash.com/photo-1625516581237-3d9d0a31538c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2044&q=80'
    const programPicLoc = 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    const rotationPicLoc = 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80'
    const studentPicLoc = 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'

    const handleAddNewQuery = (index) =>{
        const newPk = () => {
            let lastElPk = queryOptions[ queryOptions.length - 1 ]['pk']
            return lastElPk++;
        }

        if (index > 3){
            return 
        }
        setQueryOptions([...queryOptions, {query: '', value: '', pk: newPk()}])
    }


    const handleDelQuery = async (index, pk) =>{
        // clear Errors
        clearError(pk)

        let queries = [...queryOptions]

        // setting queries to anything but the ones we are trying to delete
        setQueryOptions(queries.filter( item => item.pk !== pk ) )

    }


    const handleQueryOnChange = (e, index) => {
        const { 
            //name, 
            value 
        } = e.target
        const queries = [...queryOptions]

        if (typeof index != 'undefined')
            queries[index].value = value;

        setQueryOptions(queries)
    }


    const handleQueryOptionOnChange = (e, index) =>{
        const { 
            //name, 
            value 
        } = e.target

        const queries = [...queryOptions]
        queries[index].query = value;

        setQueryOptions(queries)
    }

    const getQueryOptions = studentService.getQueryOptions

    const clearError = (pk) => {
        let errObj = {...errors}

        if ( typeof pk != 'undefined'){
            delete errObj['query' + pk.toString()]
            delete errObj['value' + pk.toString()]
        }
        
        setErrors(errObj)
    }

    const handleClear = (textInput, index, pk=null) =>{
        // textInput is not used here, because we have set the value of the searchbar/textField, so instead, we will manipulate the value from its state obj
        if (pk !== null) {
            clearError(pk)
    
            handleQueryOnChange({target: {name: '', value: ''}}, index)

        }
    }

    const handleBackdrop = () =>{
        setOpenBackdrop(true)

        setTimeout(()=> {
            setOpenBackdrop(true)
            fetchResults()
        }, 1000)

        // this could be the async function to run, while we have badckdrop on
        function fetchResults() {
    
            handleClear(textInput)
            setShowResults(true)
        }
    }

    const handleSubmit = (e, queryOptions) => {
        e.preventDefault()

        console.log('queries: ', queryOptions)

        if (validate.useQueryValidation(queryOptions, setErrors, errors)){
            // load sample data for dev and testing
            studentService.insertSampleRecords()
            setResults(studentService.getAllRecords())
    
            console.log('QUERY PARAM AND DATA: ', queryOptions)
    
            handleBackdrop()            
        }


    }

    // this should be an API call when connected
    const getStats = {
        school: () => {return '2'},
        program: () => {return '5'},
        rotation: () => {return '140'},
        student: () => {return '2000'}
    }

    return {
        errors,
        textInput,
        handleClear,
        handleSubmit,
        queryLabel,
        showResults,
        getStats,
        setShowResults,
        results,
        openBackdrop,
        setOpenBackdrop,

        getQueryOptions,
        queryOptions,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
        
        schoolPicLoc,
        programPicLoc,
        rotationPicLoc,
        studentPicLoc
    }
}

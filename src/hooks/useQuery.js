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
    const [ queryOptions, setQueryOptions ] = useState([{query: 'clast_name', value: '', pk: 100}])

    const handleAddNewQuery = (index) =>{
        function newPk() {
            let lastElPk = queryOptions[ queryOptions.length - 1 ]['pk']
            return lastElPk + 1;
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

        if (validate.useQueryValidation(queryOptions, setErrors, errors)){
            // load sample data for result table for dev and testing
            studentService.insertSampleRecords()

            console.log('QUERY PARAM AND DATA: ', queryOptions)
            console.log('setting query results')
            // send the queryOptions to backend API
            setResults(studentService.getAllRecords())
    
    
            handleBackdrop()            
        }


    }

    const handleBacktoQuery = () => {
        setShowResults(false)
        setOpenBackdrop(false)
    }




    return {
        errors,
        textInput,
        handleClear,
        handleSubmit,
        queryLabel,
        showResults,
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
        handleBacktoQuery,

    }
}

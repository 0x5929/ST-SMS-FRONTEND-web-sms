import { useState, useRef } from 'react'

import validate from './validationController'
import * as studentService from '../services/SMSRecordService'


export default function useQuery() {

    var textInput = useRef(null);
    const queryLabel = 'Search Student Database'

    const [ results, setResults ] = useState([])
    const [errors, setErrors] = useState({});
    const [ showResults, setShowResults ] = useState(false)
    const [ openBackdrop, setOpenBackdrop ] = useState(false)
    const [ queryOptions, setQueryOptions ] = useState([{query: 'clast_name', value: ''}])


    const handleAddNewQuery = (index) =>{
        if (index > 3){
            return 
        }
        setQueryOptions([...queryOptions, {query: '', value: ''}])
    }

    const handleDelQuery = async (index) =>{
        let queries = [...queryOptions]

        // setting queries to anything but the ones we are trying to delete
        setQueryOptions(queries.filter( item => item !== queries[index] ) )

    }


    const handleQueryOnChange = (e, index) => {
        const { name, value } = e.target

        const queries = [...queryOptions]

        queries[index].value = value;

        setQueryOptions(queries)
    }


    const handleQueryOptionOnChange = (e, index) =>{
        const { name, value } = e.target
        const queries = [...queryOptions]
        queries[index].query = value;

        setQueryOptions(queries)
    }

    const getQueryOptions = studentService.getQueryOptions

    const handleClear = (textInput) =>{
        setErrors({})

        if (textInput.current != null ){
            textInput.current.value = "";
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

        if (validate.validateQueryForm(queryOptions, setErrors, errors)){
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
        handleQueryOptionOnChange
    }
}

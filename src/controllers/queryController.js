import { useState, useRef } from 'react'

import * as studentService from '../services/SMSRecordService'


export default function useQuery() {

    var textInput = useRef(null);
    const queryLabel = 'Search Student Database'
    const [ results, setResults ] = useState([])
    const [ showResults, setShowResults ] = useState(false)
    const [ openBackdrop, setOpenBackdrop ] = useState(false)


    const handleClear = (textInput) =>{
        textInput.current.value = "";
    }

    const handleSubmit = e => {
        e.preventDefault()

        // load sample data for dev and testing
        studentService.insertSampleRecords()
        setResults(studentService.getAllRecords())

        setOpenBackdrop(true)

        setTimeout(()=> {
            setOpenBackdrop(true)
            fetchResults()
        }, 1000)

        function fetchResults() {
    
            handleClear(textInput)
            setShowResults(true)
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
    }
}

import { useState, useCallback } from 'react'

const useInputValue = ( initialValue, errorHandler=null, showError=false, clearFields ) => {
    const [ value, setValue ] = useState(initialValue)
    const [ error, setError ] = useState({})


    // useEffect(()=>{
    //     console.log('useInputValue useEffect called: ')
    //     if (clearFields) {
    //         console.log('clearFields is true, and value: ', value)
    //         setValue('')
    //         console.log('clearFields is true, and value after: ', value)
    //         setError({})
    //     }
    // }, [initialValue, clearFields])

/** 
    useEffect(() => {
        if (showError && errorHandler)
            setError(errorHandler(value))

    }, [value, showError, errorHandler])
*/
    const inputOnChange = useCallback( e => {
        setValue(e.target.value)

        if (!errorHandler)
            setError({})
        else
            setError(errorHandler(e.target.value))
    }, [errorHandler])

    const handleClear = useCallback(() => {
        console.log('before clear value: ', value)
        console.log('before clear error: ', error)
        setValue('')
        setError({})
        console.log('after clear value: ', value)
        console.log('after clear error: ', error)
    }, [])

    const inputStates = { value, error }
    const inputHandlers = { inputOnChange, handleClear }

    return [ inputStates, inputHandlers ]

}


export default useInputValue
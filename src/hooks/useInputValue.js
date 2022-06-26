import { useState, useCallback } from 'react'

const useInputValue = ( initialValue, errorHandler ) => {
    const [ value, setValue ] = useState(initialValue)
    const [ error, setError ] = useState({})

    const inputOnChange = useCallback(( e ) => {
        setValue(e.target.value)
        setError(errorHandler(e.target.value))
    }, [])


    const inputStates = { value, error }
    const inputHandlers = { inputOnChange }

    return [ inputStates, inputHandlers ]

}


export default useInputValue
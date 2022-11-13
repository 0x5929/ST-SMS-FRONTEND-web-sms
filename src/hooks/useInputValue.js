import { useState, useCallback, useEffect } from 'react'

const useInputValue = ( {initialValue, errorHandler=null, clearFields} ) => {
    const [ value, setValue ] = useState(initialValue)
    const [ error, setError ] = useState({})


    useEffect( () => {
        setValue(initialValue)
        setError({})
        
        // NOTE: disabled lint because it wants initialValue to be one of the dependencies, but 
        // we only want to run this function when clearFields changes!
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearFields, initialValue])
    // NOTE the only time initialValue changes is during some input fields that async fetches data from API
    // then the input depends on the data, where it was empty or null in beginning, and it will change once API is loaded


    const inputOnChange = useCallback( e => {
        setValue(e.target.value)

        if (!errorHandler)
            setError({})
        else
            setError(errorHandler(e.target.value))
    }, [errorHandler])

    return [ { value, error }, { inputOnChange } ]

}


export default useInputValue
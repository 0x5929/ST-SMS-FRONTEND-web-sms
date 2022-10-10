import { useState, useCallback, useEffect } from 'react'

const useToggle = ( initialState, clearFields=null ) => {
    const [ isTrue, setIsTrue ] = useState(initialState)

    useEffect( () => {
        setIsTrue(initialState)
        
        // NOTE: disabled lint because it wants initialValue to be one of the dependencies, but 
        // we only want to run this function when clearFields changes!
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearFields])

    const handleToggle = useCallback((state = null) => {

        if (state == null) {
            return setIsTrue(prevState => !prevState)
        }
        else {
            return setIsTrue(state)
        }

    }, [])

    return [isTrue, handleToggle]
}

export default useToggle
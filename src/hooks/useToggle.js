import { useState, useCallback } from 'react'

const useToggle = ( initialState ) => {
    const [ isTrue, setIsTrue ] = useState(initialState)

    const handleToggle = useCallback((state) => setIsTrue(state), [])

    return [isTrue, handleToggle]
}

export default useToggle
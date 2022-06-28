import { useState, useCallback } from 'react'

const useToggle = ( initialState ) => {
    const [ isTrue, setIsTrue ] = useState(initialState)

    const handleToggle = useCallback(() => setIsTrue(prevState => !prevState), [])

    return [isTrue, handleToggle]
}

export default useToggle
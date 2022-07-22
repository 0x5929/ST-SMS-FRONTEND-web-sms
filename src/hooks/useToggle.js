import { useState, useCallback } from 'react'

const useToggle = ( initialState ) => {
    const [ isTrue, setIsTrue ] = useState(initialState)

    const handleToggle = useCallback((state) => {
        if (state) {
            return setIsTrue(state)
        }else{
        return setIsTrue(prevState => !prevState)}
    }, [])

    return [isTrue, handleToggle]
}

export default useToggle
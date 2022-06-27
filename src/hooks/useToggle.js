import { useState, useCallback } from 'react'

const useToggle = ( initialState ) => {
    const [ isOpen, setIsOpen ] = useState(initialState)

    const handleToggle = useCallback(() => setIsOpen( status => !status))

    return [isOpen, handleToggle]
}

export default useToggle
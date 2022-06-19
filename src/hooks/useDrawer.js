import { useState, useCallback } from 'react';

export default function useDrawer(){
    
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)

    const handleToggleDrawer = useCallback((state) => {
        setIsDrawerOpen(!state)
    }, [])


    return [
        isDrawerOpen,
        handleToggleDrawer, 
    ]
}

import { useState } from 'react';

export default function useDrawer(){
    
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)

    const handleToggleDrawer = (state) => {
        setIsDrawerOpen(!state)
    }


    return [
        isDrawerOpen,
        handleToggleDrawer, 
    ]
}

import { useState } from 'react';

export default function useDrawer(){
    const [ drawerOpen, setDrawerOpen ] = useState(false)

    const anchorDirection = 'left'
    const menuIconColor = 'primary'
    const menuIconSize = 'large'

    const toggleDrawer = (state) => {
        setDrawerOpen(!state)
    }
    return {
        drawerOpen,
        setDrawerOpen,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    }
}

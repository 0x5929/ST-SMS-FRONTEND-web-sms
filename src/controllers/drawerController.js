import { useState } from 'react';

export default function useDrawer(){
    const [ drawerOpen, setDrawerOpen ] = useState(false)

    const toggleDrawer = (state) => {
        console.log('hello world')
        setDrawerOpen(!state)
    }
    return {
        drawerOpen,
        setDrawerOpen,
        toggleDrawer
    }
}
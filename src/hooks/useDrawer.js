import { useToggle } from '../hooks'

export default function useDrawer(){
    
    const [ isDrawerOpen, handleToggleDrawer ] = useToggle(false)

    return [
        isDrawerOpen,
        handleToggleDrawer, 
    ]
}

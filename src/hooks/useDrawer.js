import useToggle  from './useToggle'

const useDrawer = () => {
    
    const [ isDrawerOpen, handleToggleDrawer ] = useToggle(false)

    return [
        isDrawerOpen,
        handleToggleDrawer, 
    ]
}

export default useDrawer;
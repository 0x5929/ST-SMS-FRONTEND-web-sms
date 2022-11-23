import { useState, useCallback } from "react";


export function useNotification(Transition) {
    
    const [ notify, setNotify ] = useState({
        isOpen: false, 
        message: '', 
        type: 'success',
        Transition: Transition
    })

    const handleCloseNotification = useCallback(() => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }, [notify])

    // mostly used within custom hooks, and not passed in as a prop, nor as a dependency of a prop
    // thus we don't care if this is a new copy of the function each render
    const handleOpenNotification = (message, type='success') => {
        setNotify({
            ...notify,
            isOpen: true,
            message: message,
            type: type
        })
    }
    
    const notificationHandlers = { handleOpenNotification,handleCloseNotification }

    return [notify, notificationHandlers]

}


export function useConfirmDialog(){
    
    const [ confirmDialog, setConfirmDialog ] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
        onConfirm: undefined
    })

    const handleUnconfirmed = useCallback(()=>{
        
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }, [confirmDialog])

    // used mainly by hooks, not as a component prop
    const handleConfirmed = (title, subTitle, confirmCallback) => {
        setConfirmDialog({
            isOpen: true,
            title: title,
            subTitle: subTitle,
            onConfirm: confirmCallback
        })
    }

    const confirmDialogHandlers = { handleConfirmed, handleUnconfirmed }

    return [confirmDialog, confirmDialogHandlers]

}
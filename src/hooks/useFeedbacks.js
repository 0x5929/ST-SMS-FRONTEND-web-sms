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

    const handleOpenNotification = useCallback((message, type='success') => {
        setNotify({
            ...notify,
            isOpen: true,
            message: message,
            type: type
        })
    }, [notify])
    
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

    const handleConfirmed = useCallback((title, subTitle, confirmCallback) => {
        setConfirmDialog({
            isOpen: true,
            title: title,
            subTitle: subTitle,
            onConfirm: confirmCallback
        })
    }, [])
    
    const confirmDialogHandlers = { handleConfirmed, handleUnconfirmed }

    return [confirmDialog, confirmDialogHandlers]

}
import { useState } from "react";


export function useNotification(Transition) {
    
    const [ notify, setNotify ] = useState({
        isOpen: false, 
        message: '', 
        type: 'success',
        Transition: Transition
    })

    const handleCloseNotification = () => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }

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

    const handleUnconfirmed = ()=>{
        
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }

    const handleConfirmed = (title, subTitle, confirmCallback) => {
        setConfirmDialog({
            isOpen: true,
            title: title,
            subTitle: subTitle,
            onConfirm: confirmCallback
        })
    }
    
    const confirmDialogHandlers = { handleConfirmed,handleUnconfirmed }

    return [confirmDialog, confirmDialogHandlers]

}
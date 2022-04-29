import { useState } from "react";


export function useNotification(Transition) {
    
    const [ notify, setNotify ] = useState({
        isOpen: false, 
        message: '', 
        type: 'success',
        Transition: Transition
    })

    const closeNotification = (e, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }
    

    return {
        notify,
        setNotify,
        closeNotification,
    }
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
    
    return {
        confirmDialog,
        setConfirmDialog,
        handleUnconfirmed
    }
}
import { useState } from "react";


export default function useNotification(Transition) {
    const [ notify, setNotify ] = useState({
        isOpen: false, 
        message: '', 
        type: 'success',
        Transition: Transition
    })
    

    return {
        notify,
        setNotify,
    }
}
import { Alert, Snackbar } from '@mui/material';
import React from 'react';


export default function Notification(props) {
    
    const { 
        notify, 
        setNotify,

    } = props;
    
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            TransitionComponent={notify.Transition}
            onClose={ () => {setNotify({
                ...notify,
                isOpen: false
            })}}

        >
            <Alert
                severity={notify.type}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
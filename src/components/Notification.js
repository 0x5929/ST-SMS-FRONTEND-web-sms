import { Alert, Snackbar, Slide } from '@mui/material';
import React from 'react';


export function Notification(props) {
    
    const { 
        notify, 
        //setNotify,
        closeNotification,

    } = props;
    
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            TransitionComponent={notify.Transition}
            onClose={closeNotification}

        >
            <Alert
                severity={notify.type}
                onClose={closeNotification}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export function NotificationSlide (props) {

    return (
        <Slide 
            { ...props}
            direction="up" 
        />
    );
}
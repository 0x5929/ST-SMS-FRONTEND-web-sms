import React from 'react';
import Styles from './styles'

export default function Notification(props) {
    
    const { 
        notify, 
        closeNotification,

    } = props;
    
    const anchorOrigin = {vertical: 'bottom', horizontal: 'center'}

    return (
        <Styles.Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={anchorOrigin}
            TransitionComponent={notify.Transition}
            onClose={closeNotification}

        >
            <Styles.Alert
                severity={notify.type}
                onClose={closeNotification}
            >
                {notify.message}
            </Styles.Alert>
        </Styles.Snackbar>
    )
}

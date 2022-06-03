import React from 'react';
import Styles from './styles'

export default function Notification({ notify, notificationHandlers }) {
    
    const { handleCloseNotification } = notificationHandlers
    
    const anchorOrigin = {vertical: 'bottom', horizontal: 'center'}

    return (
        <Styles.Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={anchorOrigin}
            TransitionComponent={notify.Transition}
            onClose={handleCloseNotification}

        >
            <Styles.Alert
                severity={notify.type}
                onClose={handleCloseNotification}
            >
                {notify.message}
            </Styles.Alert>
        </Styles.Snackbar>
    )
}

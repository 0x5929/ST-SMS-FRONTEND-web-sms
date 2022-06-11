import React from 'react';
import Styles from './styles'

export default function Notification({ notify, notificationHandlers, ...others }) {
    
    const { handleCloseNotification } = notificationHandlers
    
    const anchorOrigin = {vertical: 'bottom', horizontal: 'center'}

    return (
        <Styles.Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={anchorOrigin}
            TransitionComponent={notify.Transition}
            onClose={handleCloseNotification}

            {...others}
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

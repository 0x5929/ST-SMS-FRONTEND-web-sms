import React from 'react';

import { 
    Alert, 
    Snackbar

} from '@mui/material';


function Notification({ notify, notificationHandlers, ...others }) {
    
    const { handleCloseNotification } = notificationHandlers
    
    const anchorOrigin = {vertical: 'bottom', horizontal: 'center'}

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={anchorOrigin}
            TransitionComponent={notify.Transition}
            onClose={handleCloseNotification}

            {...others}
        >
            <Alert
                severity={notify.type}
                onClose={handleCloseNotification}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
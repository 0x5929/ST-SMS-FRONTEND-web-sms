import React from 'react';

import { Alert, Snackbar, Box } from '@mui/material';


function Notification({ notify, notificationHandlers, ...others }) {
    console.log('Notification component rendered')
    const { handleCloseNotification } = notificationHandlers
    
    const anchorOrigin = {vertical: 'bottom', horizontal: 'center'}

    return (
        <Box data-testid="notification-components">
            <Snackbar
                data-testid="mui-snackbar"

                open={notify.isOpen}
                autoHideDuration={2000}
                anchorOrigin={anchorOrigin}
                TransitionComponent={notify.Transition}
                onClose={handleCloseNotification}

                {...others}
            >
                <Alert
                    data-testid="mui-alert"

                    severity={notify.type}
                    onClose={handleCloseNotification}
                >
                    {notify.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default React.memo(Notification)
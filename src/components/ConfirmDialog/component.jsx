import React from 'react'

import Styles from './styles'

export default function ConfirmDialog({ confirmDialog, confirmDialogHandlers }) {

    const { handleUnconfirmed } = confirmDialogHandlers;

    return (
        <Styles.Dialog open={confirmDialog.isOpen}>
            <Styles.DialogTitle>
                <Styles.IconButton disableRipple>
                    <Styles.NotListedLocation />
                </Styles.IconButton>
            </Styles.DialogTitle>
            <Styles.DialogContent>
                <Styles.Typography 
                    variant="h6"
                    text={confirmDialog.title}
                />
                <Styles.Typography 
                    variant="subtitle1"
                    text={confirmDialog.subTitle}
                />
            </Styles.DialogContent>
            <Styles.DialogActions>
                <Styles.Button 
                    color="primary"
                    text="No"
                    onClick={handleUnconfirmed}
                />
                <Styles.Button 
                    color="error"
                    text="Yes"
                    onClick={confirmDialog.onConfirm}
                />
            </Styles.DialogActions>
        </Styles.Dialog>
    )
}

import React from 'react'

import { Dialog, DialogTitle, DialogContent } from '@mui/material'


export default function Modal(props) {

    const { modalTitle, openPopup, children } = props;

    return (
        <Dialog 
            open={openPopup}
            maxWidth="md"
        >
            <DialogTitle>
                <div>{ modalTitle }</div>
            </DialogTitle>
            <DialogContent dividers>
                 { children }
            </DialogContent>

        </Dialog>
    
    )
}
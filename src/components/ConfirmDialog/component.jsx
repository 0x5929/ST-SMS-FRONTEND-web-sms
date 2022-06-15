import React from 'react'
import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle } from '@mui/material';
    
import { NotListedLocation  } from '@mui/icons-material';

import { BaseTypography as Typography } from '../Typography';
import { BaseButton as Button, BaseIconButton } from '../Buttons';

import createConfirmDialogStyles from './styles'

const Styles = createConfirmDialogStyles(
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    BaseIconButton)

export default function ConfirmDialog({ confirmDialog, confirmDialogHandlers, ...others }) {

    const { handleUnconfirmed } = confirmDialogHandlers;

    return (
        <Styles.Dialog open={confirmDialog.isOpen} {...others}>
            <Styles.DialogTitle>
                <Styles.IconButton disableRipple>
                    <NotListedLocation />
                </Styles.IconButton>
            </Styles.DialogTitle>
            <Styles.DialogContent>
                <Typography 
                    variant="h6"
                    text={confirmDialog.title}
                />
                <Typography 
                    variant="subtitle1"
                    text={confirmDialog.subTitle}
                />
            </Styles.DialogContent>
            <Styles.DialogActions>
                <Button 
                    color="primary"
                    text="No"
                    onClick={handleUnconfirmed}
                />
                <Button 
                    color="error"
                    text="Yes"
                    onClick={confirmDialog.onConfirm}
                />
            </Styles.DialogActions>
        </Styles.Dialog>
    )
}

import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'

import Typography from './Typography'
import {Button} from './Button'

import { styled } from '@mui/material'
import { NotListedLocation } from '@mui/icons-material'

const ConfirmDialogWrapper = styled(Dialog)(( {theme} ) => ({

    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(0)

}));

const DialogTitleWrapper = styled(DialogTitle)(( {theme} ) => ({

    textAlign : 'center'
  
}));

const DialogContentWrapper = styled(DialogContent)(( {theme} ) => ({
    textAlign: 'center'
  
}));

const DialogActionWrapper = styled(DialogActions)(( {theme} ) => ({
    justifyContent : 'center',
    padding: theme.spacing(2)
  
}));

const IconWrapper = styled(IconButton)(( {theme} )=>({
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
    
    '&:hover' :  {
        backgroundColor: theme.palette.error.light,
        cursor: 'default'
    },
    '& .MuiSvgIcon-root' : {
        fontSize: '8rem'
    }
}));

export default function ConfirmDialog(props) {

    const { confirmDialog, handleUnconfirmed } = props;

  return (
    <ConfirmDialogWrapper open={confirmDialog.isOpen}>
        <DialogTitleWrapper>
            <IconWrapper disableRipple>
                <NotListedLocation />
            </IconWrapper>
        </DialogTitleWrapper>
        <DialogContentWrapper>
            <Typography 
                variant="h6"
                text={confirmDialog.title}
            />
            <Typography 
                variant="subtitle1"
                text={confirmDialog.subTitle}
            />
        </DialogContentWrapper>
        <DialogActionWrapper>
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
        </DialogActionWrapper>
    </ConfirmDialogWrapper>
  )
}

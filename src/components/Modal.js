import React from 'react'

import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import Typography from './Typography'
import {IconButton} from './Button'

import { styled } from '@mui/material'


const DialogWrapper = styled(Dialog)(( {theme} ) => ({
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  
  }));
  

const DialogTitleWrapper = styled(DialogTitle)(( {theme} ) => ({
    paddingRight: '0px'
  
  }));
  

const CloseButton = styled(IconButton)(( {theme} ) => ({
    minWidth: 0,
    margin: theme.spacing(0.5),
  
  }));



export default function Modal(props) {

    const { modalTitle, openModal, closeModal, children } = props;

    return (
        <DialogWrapper 
            open={openModal}
            maxWidth="md"
        >
            <DialogTitleWrapper>
                <div style={{display: 'flex'}}>
                    <Typography
                        variant="h6"
                        component="div"
                        text={modalTitle}
                        style={{flexGrow:1}}
                    />
                    <CloseButton 
                        variant="text"
                        size="small"
                        Icon={CloseOutlinedIcon}
                        iconColor="error"
                        onClick={()=>(closeModal())}
                    />
                </div>
            </DialogTitleWrapper>
            <DialogContent dividers>

                 { children }
            
            </DialogContent>

        </DialogWrapper>
    
    )
}
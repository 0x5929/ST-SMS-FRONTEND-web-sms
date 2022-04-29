import { 
    Dialog as MuiDialog, 
    DialogTitle as MuiDialogTitle, 
    DialogContent as MuiDialogContent } from '@mui/material';

import { CloseOutlined as MuiCloseOutlinedIcon } from '@mui/icons-material';
import { styled } from '@mui/material';


import { BaseTypography } from '../Typography';
import { BaseIconButton } from '../Buttons';



const Dialog = styled(MuiDialog)(( {theme} ) => ({
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
}));

const DialogTitle = styled(MuiDialogTitle)(( {theme} ) => ({
    paddingRight: '0px'
}));

const DialogContent = styled(MuiDialogContent)(( {theme} ) => ({
    // style DialogContent if needed
}));

const CloseOutlinedIcon = styled(MuiCloseOutlinedIcon)(( {theme} ) => ({
    // Style Close OUtlined Icon if needed
}));

const Typography = styled(BaseTypography)(( {theme} ) => ({
    // Style typography if needed
}));

const IconButton = styled(BaseIconButton)(( {theme} ) => ({
    minWidth: 0,
    minHeight: 0,
    margin: theme.spacing(0.5),
}));




const Styles = {
    Dialog,
    DialogTitle,
    DialogContent,
    CloseOutlinedIcon,
    Typography,
    IconButton
}

export default Styles 
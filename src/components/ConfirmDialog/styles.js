import { 
    Dialog as MuiDialog, 
    DialogActions as MuiDialogAction, 
    DialogContent as MuiDialogContent, 
    DialogTitle as MuiDialogTitle } from '@mui/material'
    
import { NotListedLocation as MuiNotListedLocation } from '@mui/icons-material'

import BaseTypography from '../Typography/Typography'
import BaseButton from '../Button/Button'
import BaseIconButton from '../Button/IconButton'


import { styled } from '@mui/material/styles';

const Dialog = styled(MuiDialog)(( {theme} ) => ({
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(0)
}));


const DialogActions = styled(MuiDialogAction)(( {theme} ) => ({
    justifyContent : 'center',
    padding: theme.spacing(2)
}));

const DialogContent = styled(MuiDialogContent)(( {theme} ) => ({
    textAlign: 'center'
}));



const DialogTitle = styled(MuiDialogTitle)(( {theme} ) => ({
    textAlign : 'center'
}));

const NotListedLocation = styled(MuiNotListedLocation)(( {theme} ) => ({


}));

const Typography = styled(BaseTypography)(( {theme} ) => ({


}));

const Button = styled(BaseButton)(( {theme} ) => ({


}));

const IconButton = styled(BaseIconButton)(( {theme} ) => ({
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


const Styles = {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    NotListedLocation,
    Typography,
    Button,
    IconButton
}

export default Styles 
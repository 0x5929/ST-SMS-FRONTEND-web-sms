import { styled } from '@mui/material';


function createModalStyles({MuiDialog, MuiDialogTitle, BaseIconButton}){
    
    const Dialog = styled(MuiDialog)(( {theme} ) => ({
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),

    }));

    const DialogTitle = styled(MuiDialogTitle)(( {theme} ) => ({
        paddingRight: '0px'
    }));

    const IconButton = styled(BaseIconButton)(( {theme} ) => ({
        minWidth: 0,
        minHeight: 0,
        margin: theme.spacing(0.5),
    }));

    return {
        Dialog,
        DialogTitle,
        IconButton
    }
    
}


export default createModalStyles
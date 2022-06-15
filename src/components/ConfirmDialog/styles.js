
import { styled } from '@mui/material';
    

function createConfirmDialogStyles(MuiDialog,
                                MuiDialogAction,
                                MuiDialogContent,
                                MuiDialogTitle,
                                BaseIconButton,
    ) {
    
    
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
        

    return {
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        IconButton
    }

}

export default createConfirmDialogStyles
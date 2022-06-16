import { styled } from '@mui/material';


function createButtonStyles({MuiButton}){
    const Button = styled(MuiButton)(( {theme} ) => ({
        textTransform: 'none',
        margin: theme.spacing(0.5)
    
    }));

    return { Button }
    
}

function createIconBtnStyles({MuiIconButton}) {
    const IconButton = styled(MuiIconButton)(( {theme} ) => ({
        textTransform: 'none',
        margin: theme.spacing(0.5)
    
    }));

    return { IconButton }
}


export { createButtonStyles, createIconBtnStyles }
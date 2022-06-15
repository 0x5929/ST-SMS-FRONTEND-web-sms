import { styled } from '@mui/material';


function createBackdropStyles(MuiBackDrop) {
    const Backdrop = styled(MuiBackDrop)(( {theme} ) => ({
        color: '#fff'
    
    }));

    return { Backdrop }
}

export default createBackdropStyles
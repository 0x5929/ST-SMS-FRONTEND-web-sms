import { styled } from '@mui/material';


function createBackdropStyles({MuiBackdrop}) {
    const Backdrop = styled(MuiBackdrop)(( {theme} ) => ({
        color: '#fff'
    
    }));

    return { Backdrop }
}

export default createBackdropStyles
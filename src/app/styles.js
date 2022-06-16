
import { styled } from '@mui/material';


function createAppStyles({MuiBox}) {

    const Box = styled(MuiBox)(( {theme} ) => ({
        backgroundColor: theme.palette.mode === 'light'? '#f7f7f7': 'inherit',
    
    }));

    return { Box }
}

export default createAppStyles
import { styled } from '@mui/material';


function createQueryStyles({MuiPaper, MuiBox}){
    // styling paper and card to override the custom theme based on light or dark mode
    const Paper = styled(MuiPaper)(( {theme} ) => ({
        'margin' : theme.spacing(5),
        'padding': theme.spacing(3),
        
        backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }));

    const Box = styled(MuiBox)(( {theme} ) => ({

        marginRight: theme.spacing(5),
        [theme.breakpoints.down('tablet')] : {
            display: 'none'
        }
    }));

    return { Paper, Box }
}

export default createQueryStyles
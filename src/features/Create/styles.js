
import { styled } from '@mui/material/styles';


function createCreateFeatureStyles({BaseTypography, MuiPaper}){

    const Paper = styled(MuiPaper)(( {theme} ) => ({
        'margin' : theme.spacing(5),
        'padding': theme.spacing(3),
        backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto'
    
    }));

    const Typography = styled(BaseTypography)(( {theme} ) => ({
        marginBottom: theme.spacing(3)
    }));
    
    return {
        Paper,
        Typography
    }
}

export default createCreateFeatureStyles
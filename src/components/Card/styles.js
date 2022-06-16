import { styled } from '@mui/material'


function createCardStyles({MuiCard, BaseTypography}) {


    const Card = styled(MuiCard)(( {theme} ) => ({
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        marginTop: theme.spacing(3),
        borderRadius: 2,
    
    }));
    

    const Typography = styled(BaseTypography)(( {theme} ) => ({
        textAlign: 'center'
    }));
    
    return {
        Card,
        Typography
    }
}

export default createCardStyles
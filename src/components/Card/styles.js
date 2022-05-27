import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BaseTypography } from '../Typography';



const Card = styled(MuiCard)(( {theme} ) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
    borderRadius: 2,

}));



const CardContent = styled(MuiCardContent)(( {theme} ) => ({

}));


const Typography = styled(BaseTypography)(( {theme} ) => ({
    textAlign: 'center'
}));


const Styles = {
    Card,
    CardContent,
    Typography
}

export default Styles 
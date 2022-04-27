import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material';

import BaseTypography from '../Typography/Typography';
import { styled } from '@mui/material/styles';



const Card = styled(MuiCard)(( {theme} ) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: theme.spacing(10),
    borderRadius: 2,
}));


const CardContent = styled(MuiCardContent)(( {theme} ) => ({

}));


const Typography = styled(BaseTypography)(( {theme} ) => ({

}));


const Styles = {
    Card,
    CardContent,
    Typography
}

export default Styles 
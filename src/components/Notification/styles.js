import { 
    Alert as MuiAlert, 
    Snackbar as MuiSnackbar,
    Slide as MuiSlide
} from '@mui/material';

import { styled } from '@mui/material/styles';


const Alert = styled(MuiAlert)(( {theme} ) => ({
    // styling for Alert if needed
}));

const Snackbar = styled(MuiSnackbar)(( {theme} ) => ({
    // styling for Alert if needed
}));

const Slide = styled(MuiSlide)(( {theme} ) => ({
    // styling for Alert if needed
}));


const Styles = {
    Alert,
    Snackbar,
    Slide
}

export default Styles 
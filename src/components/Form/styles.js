import { styled } from '@mui/material/styles';

const Form = styled('form')(( {theme} ) => ({
    // FORM ELEMENT
    '& .MuiFormControl-root':{    
        width: '80%',
        margin: theme.spacing(1)
    }
}));

const Styles = {
    Form
}

export default Styles 
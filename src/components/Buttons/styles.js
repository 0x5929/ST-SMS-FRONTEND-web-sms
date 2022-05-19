import { 
    Button as MuiButton, 
    IconButton as MuiIconButton, 
    Fab as MuiFab

} from '@mui/material';


import { styled } from '@mui/material/styles';



const Button = styled(MuiButton)(( {theme} ) => ({
    textTransform: 'none',
    margin: theme.spacing(0.5)

}));

const IconButton = styled(MuiIconButton)(( {theme} ) => ({
    textTransform: 'none',
    margin: theme.spacing(0.5)

}));


const Fab = styled(MuiFab)(({ theme }) =>({

}))

const Styles = {
    Fab,
    Button,
    IconButton,
}

export default Styles 
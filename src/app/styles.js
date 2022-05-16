
import { Query } from '../features/Query/Query'
import { Signin } from '../features/Auth/SideSignIn'
import { Create } from '../features/Create'
import { BackToTopButton } from '../features/Navigation/BackToTop'
import { Header } from '../features/Navigation/Header'
import { styled, Box as MuiBox } from '@mui/material';

const Box = styled(MuiBox)(( {theme} ) => ({
    backgroundColor: theme.palette.mode === 'light'? '#f7f7f7': 'inherit'
  
}));
  


// if needed, we can also wrap Query, Create and Control.Header element for styling as well.
const Styles = {
    Box, 
    Query,
    Create,
    Signin,
    Header,
    BackToTopButton,
}

export default Styles 
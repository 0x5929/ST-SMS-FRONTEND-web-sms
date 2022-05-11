
import { Query } from '../features/Query/Query'
import { Signin } from '../features/Login/SideSignIn'
import { Create } from '../features/Create'

import Components from '../components' 
import { styled, Box as MuiBox } from '@mui/material';

const Box = styled(MuiBox)(( {theme} ) => ({
    backgroundColor: theme.palette.mode === 'light'? '#f7f7f7': 'inherit'
  
}));
  
const { Header } = Components 

// if needed, we can also wrap Query, Create and Control.Header element for styling as well.
const Styles = {
    Box, 
    Query,
    Create,
    Signin,
    Header,
}

export default Styles 

import { Query } from '../../features/Query/Query'
import { Create } from '../../features/Create'

import Controls from '../../components' 
import { styled } from '@mui/material';

const AppMain = styled('div')(( {theme} ) => ({
    backgroundColor: '#f7f7f7'
  
}));
  
const { Header } = Controls 

// if needed, we can also wrap Query, Create and Control.Header element for styling as well.
const Styles = {
    AppMain, 
    Query,
    Create,
    Header
}

export default Styles 
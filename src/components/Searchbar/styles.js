
import { 
    InputAdornment as MuiInputAdornment, 
    Toolbar as MuiToolbar
} from '@mui/material';

import { Clear as MuiClearIcon, Search as MuiSearchIcon } from '@mui/icons-material';
import { Input } from '../Inputs'

import { styled } from '@mui/material';

const ClearIcon = styled(MuiClearIcon)(({ theme })=>({

    ':hover' : {
        cursor: 'pointer'
    }
}))



const InputAdornment = styled(MuiInputAdornment)(({ theme })=>({
    // styling for inputAdnorment if needed
}))




const Toolbar = styled(MuiToolbar)(({ theme })=>({
    // styling for Toolbar if needed
}))





const SearchIcon = styled(MuiSearchIcon)(({ theme })=>({
    // styling for SearchIcon if needed
}))





const Styles = {
    ClearIcon,
    InputAdornment,
    Toolbar,
    SearchIcon,
    Input
}

export default Styles
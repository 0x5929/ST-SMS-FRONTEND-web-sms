
import { styled } from '@mui/material';


function createSearchBarStyles({MuiClearIcon}){
    const ClearIcon = styled(MuiClearIcon)(({ theme })=>({

        ':hover' : {
            cursor: 'pointer'
        }
    }))

    return { ClearIcon }
}

export default createSearchBarStyles
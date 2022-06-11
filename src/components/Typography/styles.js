import { Typography as MuiTypography } from '@mui/material'
import { styled } from '@mui/material/styles';



const Typography = styled(MuiTypography)(( {theme} ) => ({

    margin: theme.spacing(1)
}));



const Styles = {
    Typography
}

export default Styles 
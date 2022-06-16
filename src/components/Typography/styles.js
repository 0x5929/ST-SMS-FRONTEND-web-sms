import { styled } from '@mui/material/styles';



function createTypographyStyles({MuiTypography}){
    const Typography = styled(MuiTypography)(( {theme} ) => ({

        margin: theme.spacing(1)
    }));

    return { Typography }
}

export default createTypographyStyles
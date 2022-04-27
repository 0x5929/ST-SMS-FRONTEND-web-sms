import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const Img = styled(Box)(( {theme} ) => ({
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
}));


const Styles = {
    Img
}

export default Styles 
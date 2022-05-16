import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const Img = styled(Box)(( {theme} ) => ({
    height: 233,
    width: 350,
    maxHeight: { mobile: 233, laptop: 167 },
    maxWidth: { mobile: 350, laptop: 250 },
}));


const Styles = {
    Img
}

export default Styles 
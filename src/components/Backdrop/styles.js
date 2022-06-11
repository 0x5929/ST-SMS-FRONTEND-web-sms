import { Backdrop as MuiBackdrop, CircularProgress as MuiCircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles';



const Backdrop = styled(MuiBackdrop)(( {theme} ) => ({
    color: '#fff'

}));

const CircularProgress = styled(MuiCircularProgress)(( {theme} ) => ({
    // CircularProgress styles, if needed

}));


const Styles = {
    Backdrop,
    CircularProgress
}

export default Styles 
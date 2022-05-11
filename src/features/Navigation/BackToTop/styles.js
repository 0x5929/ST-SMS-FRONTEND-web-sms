import { 
    Box as MuiBox,
    Container as MuiContainer,
    Fab as MuiFab,
    Zoom as MuiZoom
} from '@mui/material';

import { KeyboardArrowUp as MuiKeyboardArrowUp } from '@mui/icons-material'

import { styled } from '@mui/material/styles';

import  Components  from '../../../components';


const Box = styled(MuiBox)(( {theme} ) => ({
    // styling for Box if needed
}));

const Container = styled(MuiContainer)(( {theme} ) => ({
    // styling for Container if needed
}));

const Fab = styled(MuiFab)(( {theme} ) => ({
    // styling for Fab if needed
}));


const Zoom = styled(MuiZoom)(( {theme} ) => ({
    // styling for Zoom if needed
}));

const KeyboardArrowUpIcon = styled(MuiKeyboardArrowUp)(( {theme} ) => ({
    // styling for KeyboardArrowUpIcon if needed
}));

const Typography = styled(Components.BaseTypography)(( {theme} ) => ({
    // styling for Typography if needed
}));


const Styles = {
    Box,
    Container,
    Fab,
    Zoom,
    KeyboardArrowUpIcon,
    Typography
}

export default Styles 
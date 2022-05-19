import { 
    Box as MuiBox,
    Container as MuiContainer,
    Zoom as MuiZoom
} from '@mui/material';

import { KeyboardArrowUp as MuiKeyboardArrowUp } from '@mui/icons-material'

import { styled } from '@mui/material/styles';

import  Components  from '../../../components';


const FabBox = styled(MuiBox)(( {theme} ) => ({
    position: 'fixed', 
    bottom: theme.spacing(), 
    right: theme.spacing()
}));

const Container = styled(MuiContainer)(( {theme} ) => ({
    // styling for Container if needed
}));

const Fab = styled(Components.Fab)(( {theme} ) => ({
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
    FabBox,
    Container,
    Fab,
    Zoom,
    KeyboardArrowUpIcon,
    Typography
}

export default Styles 
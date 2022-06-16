import { 
    Box as MuiBox,
    Container as MuiContainer,
    Zoom as MuiZoom
} from '@mui/material';

import { KeyboardArrowUp as MuiKeyboardArrowUp } from '@mui/icons-material'

import { styled, keyframes } from '@mui/material/styles';

import  Components  from '../../../components';

// https://animista.net/
const heartbeat = keyframes`
from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  }

`;
const FabBox = styled(MuiBox)(( {theme} ) => ({
    position: 'fixed', 
    bottom: theme.spacing(), 
    right: theme.spacing()
}));


const Container = styled(MuiContainer)(( {theme} ) => ({
    // styling for Container if needed
}));

const BaseFab = styled(Components.BaseFab)(( {theme} ) => ({
    // styling for Fab if needed
}));


// with animation
const Fab = styled(BaseFab)`

    &:hover {
        animation: ${heartbeat} 1.2s ease-in-out infinite both;
    }

`;

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
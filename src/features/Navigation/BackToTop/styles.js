import { styled, keyframes } from '@mui/material';


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



function createBackToTopStyles({MuiBox, BaseFab}){
    const FabBox = styled(MuiBox)(( {theme} ) => ({
        position: 'fixed', 
        bottom: theme.spacing(), 
        right: theme.spacing()
    }));

    // with animation
    const Fab = styled(BaseFab)`

    &:hover {
        animation: ${heartbeat} 1.2s ease-in-out infinite both;
    }

    `;

    return { FabBox, Fab }
}

export default createBackToTopStyles
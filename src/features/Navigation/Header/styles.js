import { styled, keyframes } from '@mui/material';
import { switchClasses } from "@mui/material/Switch";


const rotateCenter = keyframes`
0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
}`;




function createHeaderStyles(components){

    const {
        MuiBox,
        MuiAppBar,
        BaselineIconButton,
        BaseTypography,
        MuiSwitch,
        BaseButton
    } = components

    
    const Box = styled(MuiBox)(( {theme} ) => ({
        flexGrow: 1
    }));

    const AppBar = styled(MuiAppBar)(( {theme} ) => ({
        color: theme.palette.primary.main,
        position: 'relative',
        zIndex: theme.zIndex.drawer + 1,
    }));

    const BaseIconButton = styled(BaselineIconButton)(( {theme} ) => ({
        marginRight: theme.spacing(2),
        color: theme.palette.common.white
    }));
    
    // with animation
    const IconButton = styled(BaseIconButton)`
        &:active {
            animation: ${rotateCenter} 0.8s ease-in-out both;
        }
    `;

    const Typography = styled(BaseTypography)(( {theme} ) => ({
        flexGrow: 1,
        color: theme.palette.common.white,
    }));
    
    const BaseSwitch = styled(MuiSwitch)(( {theme} ) => ({
        marginRight: theme.spacing(2),
        color: theme.palette.common.white
    }));
    
    
    const Switch = styled(BaseSwitch)(( {theme} ) => {
        
        const key = `& .${switchClasses.switchBase}.${switchClasses.disabled}`;
        return {
            [key] : {
            color: theme.palette.primary.dark
        }
    }});

    const Button = styled(BaseButton)(( {theme} ) => ({
        color: theme.palette.common.white
    }));
    
    return {
        Box,
        AppBar,
        BaseIconButton,
        IconButton,
        Typography,
        Switch,
        Button
    }

}

export default createHeaderStyles
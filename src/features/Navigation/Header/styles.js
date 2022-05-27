
import { 
    Box as MuiBox, 
    AppBar as MuiAppBar, 
    Toolbar as MuiToolBar,
    Switch as MuiSwitch
 } from '@mui/material';

import { 
    Menu as MuiMenuIcon, 
    Brightness4 as MuiBrightness4Icon, 
    BrightnessHigh as MuiBrightnessHigh } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

import { Drawer } from '../SideNav';
import Components from '../../../components'


const rotateCenter = keyframes`
0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
}`;


const Box = styled(MuiBox)(( {theme} ) => ({
    flexGrow: 1
}));

const AppBar = styled(MuiAppBar)(( {theme} ) => ({
    color: theme.palette.primary.main,
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
}));

const Toolbar = styled(MuiToolBar)(( {theme} ) => ({
    // style Toolbar if needed
}));

const MenuIcon = styled(MuiMenuIcon)(( {theme} ) => ({
    // style MenuIcon if needed
}));

const Brightness4Icon = styled(MuiBrightness4Icon)(( {theme} ) => ({
    // style Brightness4Icon if needed
}));

const  BrightnessHighIcon = styled(MuiBrightnessHigh)(( {theme} ) => ({
    // style Brightess7Icon if needed
}));

const Switch = styled(MuiSwitch)(( {theme} ) => ({
    marginRight: theme.spacing(2),
    color: theme.palette.common.white
}));


const BaseIconButton = styled(Components.BaseIconButton)(( {theme} ) => ({
    marginRight: theme.spacing(2),
    color: theme.palette.common.white
}));

const IconButton = styled(BaseIconButton)`
    &:active {
        animation: ${rotateCenter} 0.8s ease-in-out both;
    }
`;


const Button = styled(Components.BaseButton)(( {theme} ) => ({
    color: theme.palette.common.white
}));



const Typography = styled(Components.BaseTypography)(( {theme} ) => ({
    flexGrow: 1,
    color: theme.palette.common.white,
}));


const Styles = {
    Drawer,
    Switch,
    Box,
    AppBar,
    Toolbar,
    MenuIcon,
    Brightness4Icon,
    BrightnessHighIcon,
    IconButton,
    Button,
    Typography
}

export default Styles 
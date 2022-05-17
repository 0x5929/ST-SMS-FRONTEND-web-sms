
import { 
    Box as MuiBox, 
    AppBar as MuiAppBar, 
    Toolbar as MuiToolBar,
    Switch as MuiSwitch
 } from '@mui/material';

import { 
    Menu as MuiMenuIcon, 
    Brightness3 as MuiBrightness3Icon, 
    LightMode as MuiLightMode } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { Drawer } from '../SideNav';
import Components from '../../../components'


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

const Brightness3Icon = styled(MuiBrightness3Icon)(( {theme} ) => ({
    // style Brightness4Icon if needed
}));

const  LightModeIcon = styled(MuiLightMode)(( {theme} ) => ({
    // style Brightess7Icon if needed
}));

const Switch = styled(MuiSwitch)(( {theme} ) => ({
    marginRight: theme.spacing(2),
    color: theme.palette.common.white
}));


const IconButton = styled(Components.BaseIconButton)(( {theme} ) => ({
    marginRight: theme.spacing(2),
    color: theme.palette.common.white
}));


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
    Brightness3Icon,
    LightModeIcon,
    IconButton,
    Button,
    Typography
}

export default Styles 

import { 
    Box as MuiBox, 
    AppBar as MuiAppBar, 
    Toolbar as MuiToolBar } from '@mui/material';
import { 
    Menu as MuiMenuIcon, 
    Brightness4 as MuiBrightness4Icon, 
    Brightness7 as MuiBrightness7 } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { Drawer } from '../SideNav';
import Components from '../../../components'


const Box = styled(MuiBox)(( {theme} ) => ({
    flexGrow: 1
}));

const AppBar = styled(MuiAppBar)(( {theme} ) => ({
    color: theme.palette.primary.main
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

const  Brightness7Icon = styled(MuiBrightness7)(( {theme} ) => ({
    // style Brightess7Icon if needed
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
    Box,
    AppBar,
    Toolbar,
    MenuIcon,
    Brightness4Icon,
    Brightness7Icon,
    IconButton,
    Button,
    Typography
}

export default Styles 
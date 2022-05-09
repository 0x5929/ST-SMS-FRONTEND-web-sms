
import { 
    Box as MuiBox, 
    AppBar as MuiAppBar, 
    Toolbar as MuiToolBar } from '@mui/material';
import { Menu as MuiMenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { Drawer } from '../Drawer';
import { BaseButton, BaseIconButton } from '../Buttons';
import { BaseTypography } from '../Typography'


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


const IconButton = styled(BaseIconButton)(( {theme} ) => ({
    marginRight: theme.spacing(2),
    color: theme.palette.common.white
}));


const Button = styled(BaseButton)(( {theme} ) => ({
    color: theme.palette.common.white
}));

const Typography = styled(BaseTypography)(( {theme} ) => ({
    flexGrow: 1,
    color: theme.palette.common.white,
}));


const Styles = {
    Drawer,
    Box,
    AppBar,
    Toolbar,
    MenuIcon,
    IconButton,
    Button,
    Typography
}

export default Styles 
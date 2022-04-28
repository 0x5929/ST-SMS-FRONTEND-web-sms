
import { 
    Box as MuiBox, 
    AppBar as MuiAppBar, 
    Toolbar as MuiToolBar } from '@mui/material';
import { Menu as MuiMenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { Drawer } from '../Drawer';
import { BaseButton, BaseIconButton } from '../Button';
import { BaseTypography } from '../Typography'


const Box = styled(MuiBox)(( {theme} ) => ({
    flexGrow: 1
}));

const AppBar = styled(MuiAppBar)(( {theme} ) => ({
    // style AppBar if needed
}));

const Toolbar = styled(MuiToolBar)(( {theme} ) => ({
    // style Toolbar if needed
}));

const MenuIcon = styled(MuiMenuIcon)(( {theme} ) => ({
    // style MenuIcon if needed
}));


const IconButton = styled(BaseIconButton)(( {theme} ) => ({
    marginRight: theme.spacing(2)
}));


const Button = styled(BaseButton)(( {theme} ) => ({
    // style Button if needed
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

import { 
    Divider as MuiDivider, 
    List as MuiList, 
    ListItem as MuiListItem, 
    ListItemIcon as MuiListItemIcon, 
    ListItemText as MuiListItemText, 
    Drawer as MuiDrawer } from '@mui/material'

import { 
    ManageSearch as MuiManageSearchIcon,
    CreateNewFolder as MuiCreateNewFolderIcon,
    Menu as MuiMenuIcon } from '@mui/icons-material';

import Components from '../../../components'

import { styled } from '@mui/material/styles';



const Divider = styled(MuiDivider)(( {theme} ) => ({
    // style Divider if needed
}));

const List = styled(MuiList)(( {theme} ) => ({
    width: 250,

    // this will target the icon button and its parent div
    '& .MuiIconButton-root' :  {
        marginLeft: theme.spacing(2.5),
        marginTop: theme.spacing(0.20)
    }
}));

const ListItem = styled(MuiListItem)(( {theme} ) => ({
    // style ListItem if needed
}));

const ListItemIcon = styled(MuiListItemIcon)(( {theme} ) => ({
    // style ListItemIcon if needed
}));

const ListItemText = styled(MuiListItemText)(( {theme} ) => ({
    '& .MuiTypography-root' : {
        color: theme.palette.text.primary
    }
}));

const Drawer = styled(MuiDrawer)(( {theme} ) => ({
    // style Drawer if needed
}));

const ManageSearchIcon = styled(MuiManageSearchIcon)(( {theme} ) => ({
    // style ManageSearchIcon if needed
}));

const CreateNewFolderIcon = styled(MuiCreateNewFolderIcon)(( {theme} ) => ({
    // style CreateNewFolderIcon if needed
}));

const MenuIcon = styled(MuiMenuIcon)(( {theme} ) => ({
    // style MenuIcon if needed
    // only on the icon, not the parent div
}));

const IconButton = styled(Components.BaseIconButton)(( {theme} ) => ({
    // style IconButton if needed
}));



const Styles = {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    ManageSearchIcon,
    CreateNewFolderIcon,
    MenuIcon,
    IconButton
}

export default Styles 
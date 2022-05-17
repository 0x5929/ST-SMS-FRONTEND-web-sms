
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
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';



const Divider = styled(MuiDivider)(( {theme} ) => ({
    // style Divider if needed
}));

const List = styled(MuiList)(( {theme} ) => ({
    width: theme.spacing(31.25),
}));

const ListItem = styled(MuiListItem)(( {theme} ) => ({
    // style ListItem if needed
}));

const FirstListItem = styled(MuiListItem)(( {theme} ) => ({
    marginTop: theme.spacing(7)
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





const Styles = {
    Divider,
    List,
    FirstListItem,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    ManageSearchIcon,
    CreateNewFolderIcon,
}

export default Styles 
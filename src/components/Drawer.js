import React from 'react';

import { Divider, List, ListItem, ListItemIcon, ListItemText, Drawer as MuiDrawer } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { IconButton } from './Button';

const MenuList = styled(List)(({theme}) => ({
    width: 250,

    '& .MuiIconButton-root' :  {
        marginLeft: theme.spacing(0.75),
    }
}))

const MenuItemText = styled(ListItemText)(({theme}) => ({
    '& .MuiTypography-root' : {
        color: theme.palette.text.primary
    }

}))


export default function Drawer (props) {
    
    const {
        drawerOpen,
        Link,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    } = props


    return (
        <MuiDrawer
            anchor={anchorDirection}
            open={drawerOpen}
            onClose={()=>(toggleDrawer(drawerOpen))}
        >
            <MenuList>
                <ListItem>
                    <IconButton
                        color={menuIconColor}
                        size={menuIconSize}
                        onClick={()=>(toggleDrawer(drawerOpen))}
                    >
                        <MenuIcon 
                            size={menuIconSize}
                        />   
                    </IconButton>
                </ListItem>
                <Divider />
                <Link to="/">
                    <ListItem button disableRipple>
                        <ListItemIcon>
                            <ManageSearchIcon />
                        </ListItemIcon>
                        <MenuItemText 
                            primary={'QUERY'}
                            
                        />
                    </ListItem>
                </Link>
                <Link to="/create">
                    <ListItem button disableRipple>
                        <ListItemIcon>
                            <CreateNewFolderIcon />
                        </ListItemIcon>
                        <MenuItemText 
                            primary={'CREATE'}
                        />
                    </ListItem>
                </Link>
                <Divider />
            </MenuList>
        </MuiDrawer>
    )
}
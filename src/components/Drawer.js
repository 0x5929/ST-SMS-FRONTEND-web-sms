import React from 'react';

import { Divider, List, ListItem, ListItemIcon, ListItemText, Drawer as MuiDrawer } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { styled } from '@mui/material/styles';

const MenuList = styled(List)(({theme}) => ({
    width: 250
}))

export default function Drawer (props) {
    
    const {
        drawerOpen,
        Link,
        toggleDrawer
    } = props

    const anchor = 'left'

    return (
        <MuiDrawer
            anchor={anchor}
            open={drawerOpen}
            onClose={()=>(toggleDrawer(drawerOpen))}
        >
            <MenuList>
                <Link to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <ManageSearchIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary={'QUERY'}
                        />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/create">
                    <ListItem button>
                        <ListItemIcon>
                            <CreateNewFolderIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary={'CREATE'}
                        />
                    </ListItem>
                </Link>
                <Divider />
            </MenuList>
        </MuiDrawer>
    )
}
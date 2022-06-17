import React from 'react';

import { 
    Divider, 
    List as MuiList, 
    ListItem as MuiListItem, 
    ListItemIcon, 
    ListItemText as MuiListItemText, 
    Drawer as MuiDrawer } from '@mui/material'

import { 
    ManageSearch as ManageSearchIcon,
    CreateNewFolder as CreateNewFolderIcon } from '@mui/icons-material'

import createSideNavStyles from './styles'

const Styles = createSideNavStyles({
    MuiList,
    MuiListItem,
    MuiListItemText
})

function Drawer (props) {
    
    const {
        Link,
        isDrawerOpen,
        handleToggleDrawer

    } = props


    return (
        <MuiDrawer
            anchor="left"
            open={isDrawerOpen}
            onClose={()=>(handleToggleDrawer(isDrawerOpen))}
        >
            <Styles.List>
                <Link to="/query" onClick={()=>{handleToggleDrawer(isDrawerOpen)}}>
                    <Styles.FirstListItem button disableRipple>
                        <ListItemIcon>
                            <ManageSearchIcon />
                        </ListItemIcon>
                        <Styles.ListItemText primary={'QUERY'} />
                    </Styles.FirstListItem>
                </Link>
                <Link to="/create" onClick={()=>{handleToggleDrawer(isDrawerOpen)}}>
                    <MuiListItem button disableRipple>
                        <ListItemIcon>
                            <CreateNewFolderIcon />
                        </ListItemIcon>
                        <Styles.ListItemText primary={'CREATE'} />
                    </MuiListItem>
                </Link>
                <Divider />
            </Styles.List>
        </MuiDrawer>
    )
}

export default Drawer
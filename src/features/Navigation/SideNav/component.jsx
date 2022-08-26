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

function Drawer ({ Link, isDrawerOpen, handleToggleDrawer }) {
    
    console.log('Drawer feature rendered')

    return (
        <MuiDrawer
            data-testid="mui-drawer"

            anchor="left"
            open={isDrawerOpen}
            onClose={handleToggleDrawer}
        >
            <Styles.List>
                <Link to="/query" onClick={()=>{handleToggleDrawer()}}>
                    <Styles.FirstListItem button disableRipple>
                        <ListItemIcon>
                            <ManageSearchIcon />
                        </ListItemIcon>
                        <Styles.ListItemText primary={'QUERY'} />
                    </Styles.FirstListItem>
                </Link>
                <Link to="/create" onClick={()=>{handleToggleDrawer()}}>
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

export default React.memo(Drawer)
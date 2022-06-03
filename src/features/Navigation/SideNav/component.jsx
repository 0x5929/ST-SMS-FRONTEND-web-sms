import React from 'react';

import Styles from './styles'

export default function Drawer (props) {
    
    const {
        Link,
        isDrawerOpen,
        handleToggleDrawer

    } = props




    return (
        <Styles.Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={()=>(handleToggleDrawer(isDrawerOpen))}
        >
            <Styles.List>
                <Link to="/query" onClick={()=>{handleToggleDrawer(isDrawerOpen)}}>
                    <Styles.FirstListItem button disableRipple>
                        <Styles.ListItemIcon>
                            <Styles.ManageSearchIcon />
                        </Styles.ListItemIcon>
                        <Styles.ListItemText primary={'QUERY'} />
                    </Styles.FirstListItem>
                </Link>
                <Link to="/create" onClick={()=>{handleToggleDrawer(isDrawerOpen)}}>
                    <Styles.ListItem button disableRipple>
                        <Styles.ListItemIcon>
                            <Styles.CreateNewFolderIcon />
                        </Styles.ListItemIcon>
                        <Styles.ListItemText primary={'CREATE'} />
                    </Styles.ListItem>
                </Link>
                <Styles.Divider />
            </Styles.List>
        </Styles.Drawer>
    )
}
import React from 'react';

import Styles from './styles'

export default function Drawer (props) {
    
    const {
        drawerOpen,
        Link,
        toggleDrawer,
        anchorDirection, 

    } = props




    return (
        <Styles.Drawer
            anchor={anchorDirection}
            open={drawerOpen}
            onClose={()=>(toggleDrawer(drawerOpen))}
        >
            <Styles.List>
                <Link to="/query" onClick={()=>{toggleDrawer(drawerOpen)}}>
                    <Styles.FirstListItem button disableRipple>
                        <Styles.ListItemIcon>
                            <Styles.ManageSearchIcon />
                        </Styles.ListItemIcon>
                        <Styles.ListItemText 
                            primary={'QUERY'}
                        />
                    </Styles.FirstListItem>
                </Link>
                <Link to="/create" onClick={()=>{toggleDrawer(drawerOpen)}}>
                    <Styles.ListItem button disableRipple>
                        <Styles.ListItemIcon>
                            <Styles.CreateNewFolderIcon />
                        </Styles.ListItemIcon>
                        <Styles.ListItemText
                            primary={'CREATE'}
                        />
                    </Styles.ListItem>
                </Link>
                <Styles.Divider />
            </Styles.List>
        </Styles.Drawer>
    )
}
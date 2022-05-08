import React from 'react';

import Styles from './styles'

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
        <Styles.Drawer
            anchor={anchorDirection}
            open={drawerOpen}
            onClose={()=>(toggleDrawer(drawerOpen))}
        >
            <Styles.List>
                <Styles.ListItem>
                    <Styles.IconButton
                        color={menuIconColor}
                        size={menuIconSize}
                        onClick={()=>(toggleDrawer(drawerOpen))}
                    >
                        <Styles.MenuIcon 
                            size={menuIconSize}
                        />   
                    </Styles.IconButton>
                </Styles.ListItem>
                <Styles.Divider />
                <Link to="/query" onClick={()=>{toggleDrawer(drawerOpen)}}>
                    <Styles.ListItem button disableRipple>
                        <Styles.ListItemIcon>
                            <Styles.ManageSearchIcon />
                        </Styles.ListItemIcon>
                        <Styles.ListItemText 
                            primary={'QUERY'}
                        />
                    </Styles.ListItem>
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
import React from 'react';

import Styles from './styles'


export default function Header(props) {
    
    const {
      drawerOpen,
      toggleDrawer,
      Link,
      anchorDirection, 
      menuIconColor,
      menuIconSize,
      authed
    } = props

    
    return (     
        <Styles.Box sx={{ flexGrow: 1 }}>
            <Styles.AppBar position="static">
                <Styles.Toolbar>
                    {
                        authed &&
                        <Styles.IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={()=>(toggleDrawer(drawerOpen))}
                        >
                            <Styles.MenuIcon />
                        </Styles.IconButton>
                    }

                    <Styles.Typography 
                        variant="h6" 
                        component="div" 
                        text="Student Mangement System"
                    />
                    {
                        authed && 
                        <Styles.Button 
                            color="inherit"
                            text="LOGOUT"
                            variant="text"
                        />
                    }
                    
                    <Styles.Drawer 
                        Link={Link}
                        drawerOpen={drawerOpen}
                        toggleDrawer={toggleDrawer}
                        anchorDirection={anchorDirection}
                        menuIconColor={menuIconColor}
                        menuIconSize={menuIconSize}
                    />
                </Styles.Toolbar>
            </Styles.AppBar>
        </Styles.Box>
     );
}

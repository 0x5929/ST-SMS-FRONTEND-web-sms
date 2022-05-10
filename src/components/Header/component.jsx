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
      authed,
      logout
    } = props

    
    return (     
        <Styles.Box>
            <Styles.AppBar position="static" enableColorOnDark>
                <Styles.Toolbar>
                    {
                        authed &&
                        <Styles.IconButton
                            size="large"
                            edge="start"
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
                            text="LOGOUT"
                            variant="text"
                            onClick={logout}
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

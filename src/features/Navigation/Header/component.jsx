import React from 'react';
import { useDrawer } from '../../../hooks';
import { useThemeContext, useAuthContext } from '../../../contexts'

import Styles from './styles'


export default function Header({ Link }) {
    
    const {
        toggleColorMode,
        darkMode
    } = useThemeContext()

    const {
        authed,
        logout
    } = useAuthContext()

    const {
        drawerOpen,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    } = useDrawer()


    
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
                    <Styles.Switch checked={darkMode} onChange={toggleColorMode} />
                    <Styles.IconButton
                        size="small"
                        onClick={toggleColorMode}
                        color="inherit"
                    >
                        {
                            darkMode ? 
                                <Styles.LightModeIcon /> : <Styles.Brightness3Icon />
                        }
                    </Styles.IconButton>
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

import React from 'react';
import { useDrawer, useHeader } from '../../../hooks';
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
        headerTitle
    } = useHeader()

    const {
        drawerOpen,
        toggleDrawer,
        anchorDirection, 
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
                        text={headerTitle}
                    />
                    <Styles.Switch checked={darkMode} onChange={toggleColorMode} />
                    <Styles.IconButton
                        size="small"
                        onClick={toggleColorMode}
                        color="inherit"
                        disableRipple
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
                    />
                </Styles.Toolbar>
            </Styles.AppBar>
        </Styles.Box>
    );
}

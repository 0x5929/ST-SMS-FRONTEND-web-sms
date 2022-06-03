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

    const [

        isDrawerOpen,
        handleToggleDrawer, 

    ] = useDrawer()


    
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
                            onClick={()=>(handleToggleDrawer(isDrawerOpen))}
                        >
                            <Styles.MenuIcon />
                        </Styles.IconButton>
                    }

                    <Styles.Typography 
                        variant="h6" 
                        component="div" 
                        text={headerTitle}
                    />
                    <Styles.Switch disabled checked={darkMode} onChange={toggleColorMode} />
                    <Styles.IconButton
                        size="small"
                        onClick={toggleColorMode}
                        color="inherit"
                        disableRipple
                    >
                        {
                            darkMode ? 
                                <Styles.BrightnessHighIcon /> : <Styles.Brightness4Icon />
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
                        isDrawerOpen={isDrawerOpen}
                        handleToggleDrawer={handleToggleDrawer}
                    />
                </Styles.Toolbar>
            </Styles.AppBar>
        </Styles.Box>
    );
}

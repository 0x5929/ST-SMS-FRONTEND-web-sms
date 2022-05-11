import React from 'react';
import { useDrawer } from '../../../hooks';

import Styles from './styles'


export default function Header(props) {
    
    const {
      ColorModeContext,
      Link,
      theme,
      authed,
      logout
    } = props

    const {
        drawerOpen,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    } = useDrawer()

    
    return (
        <ColorModeContext.Consumer>
            {
                ({toggleColorMode}) => (
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
                                    
                                    !authed && 
                                    
                                    <Styles.IconButton
                                        size="small"
                                        onClick={toggleColorMode}
                                        color="inherit"
                                    >
                                        {
                                            theme.palette.mode === 'dark' ? 
                                                <Styles.Brightness7Icon /> : <Styles.Brightness4Icon />
                                        }
                                     </Styles.IconButton>
                                }

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
                )
            }
        </ColorModeContext.Consumer>
     );
}

import React from 'react'

import { 
    Box as MuiBox, 
    AppBar as MuiAppBar, 
    Toolbar,
    Switch as MuiSwitch } from '@mui/material'

 import { 
    Menu as MenuIcon, 
    Brightness4 as Brightness4Icon, 
    BrightnessHigh as BrightnessHighIcon } from '@mui/icons-material'


import createHeaderStyles from './styles'
import { Drawer } from '../SideNav';
import Components from '../../../components'
import { useDrawer, useHeader } from '../../../hooks'
import { useThemeContext, useAuthContext } from '../../../contexts'


const Styles = createHeaderStyles({
    MuiBox,
    MuiAppBar,
    BaselineIconButton: Components.BaseIconButton,
    BaseTypography: Components.BaseTypography,
    MuiSwitch,
    BaseButton: Components.BaseButton
})

function Header({ Link }) {
    
    const {
        toggleColorMode,
        darkMode
    } = useThemeContext()

    const {
        authed,
        logout
    } = useAuthContext()

    const headerTitle = useHeader()

    const [ isDrawerOpen,handleToggleDrawer ] = useDrawer()


    
    return (
        <Styles.Box>
            <Styles.AppBar position="static" enableColorOnDark>
                <Toolbar>
                    {
                        authed &&
                        <Styles.BaseIconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={()=>(handleToggleDrawer(isDrawerOpen))}
                        >
                            <MenuIcon />
                        </Styles.BaseIconButton>
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
                                <BrightnessHighIcon /> : <Brightness4Icon />
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
                    <Drawer 
                        Link={Link}
                        isDrawerOpen={isDrawerOpen}
                        handleToggleDrawer={handleToggleDrawer}
                    />
                </Toolbar>
            </Styles.AppBar>
        </Styles.Box>
    );
}

export default Header
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


const Styles = createHeaderStyles({
    MuiBox,
    MuiAppBar,
    BaselineIconButton: Components.BaseIconButton,
    BaseTypography: Components.BaseTypography,
    MuiSwitch,
    BaseButton: Components.BaseButton
})

function Header(props) {
    
    const {
        Link,
        darkMode,
        toggleColorMode,
        authed,
        logout,
    } = props


    const headerTitle = useHeader()
    const [ isDrawerOpen, handleToggleDrawer ] = useDrawer()

    
    return (
        <Styles.Box>
            <Styles.AppBar data-testid="mui-appbar" position="static" enableColorOnDark>
                <Toolbar>
                    {
                        authed ? 
                        <Styles.BaseIconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={()=>(handleToggleDrawer())}
                        >
                            <MenuIcon />
                        </Styles.BaseIconButton>
                        :
                        <Styles.BaseIconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            disabled
                        >
                            <MenuIcon />
                        </Styles.BaseIconButton>
                    }

                    <Styles.Typography 
                        variant="h6" 
                        component="div" 
                        text={headerTitle}
                    />
                    {
                        authed ?
                        <Styles.Button 
                            text="LOGOUT"
                            variant="text"
                            onClick={logout}
                        /> : 
                        <Styles.Button 
                            text="LOGOUT"
                            variant="text"
                            onClick={logout}
                            sx={{
                                visibility: 'hidden'
                            }}
                        
                        /> 
                    }
                    <Styles.Switch data-testid="mui-switch" disabled checked={darkMode} onChange={toggleColorMode} />
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

export default React.memo(Header)
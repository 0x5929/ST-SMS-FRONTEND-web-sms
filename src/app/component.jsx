import React from 'react'
import { Box as MuiBox } from '@mui/material'

import createAppStyles from './styles'
import { BackToTopButton } from '../features/Navigation/BackToTop'
import { Header } from '../features/Navigation/Header'
import { useAuthContext, useThemeContext } from '../contexts'

const Styles = createAppStyles({MuiBox})

function App({ Link, Outlet }) {

    console.log('App component rendered')

    const {
        toggleColorMode,
        darkMode
    } = useThemeContext()

    const {
        authed,
        logout
    } = useAuthContext()
    
    return (
        <>
            <Styles.Box>
                    <Header 
                        Link={Link} 
                        darkMode={darkMode}
                        toggleColorMode={toggleColorMode} 
                        authed={authed}
                        logout={logout}
                    />
                    <BackToTopButton />
            </Styles.Box>
            <Outlet />
        </>
    );
}


export default React.memo(App)
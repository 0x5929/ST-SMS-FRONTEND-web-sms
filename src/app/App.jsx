import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RequiredAuth from './RequiredAuth';
import { useAuth, useTheme, useDrawer } from '../hooks'

import Styles from './styles'


export default function App(props) {


    const {
        ColorModeContext,
        colorMode,
        ThemeProvider,
        appTheme
    } = useTheme()


    const {
        AuthContext,
        authed,
        user,
        login,
        logout
    } = useAuth()


    const {
        drawerOpen,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    } = useDrawer()

    

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <AuthContext.Provider value={{authed, user, login, logout}}>
                    <Styles.Box>
                        <Router>
                            <Styles.Header 
                                Link={Link}
                                ColorModeContext={ColorModeContext}
                                theme={appTheme}
                                drawerOpen={drawerOpen}
                                toggleDrawer={toggleDrawer}
                                anchorDirection={anchorDirection}
                                menuIconColor={menuIconColor}
                                menuIconSize={menuIconSize}
                                authed={authed}
                                logout={logout}
                            />
                            <Routes>
                                <Route 
                                    path="/" 
                                    element={
                                        <Styles.Signin AuthContext={AuthContext} />
                                    } 
                                />
                                <Route 
                                    path="/create" 
                                    element={
                                        <RequiredAuth authed={authed}>
                                            <Styles.Create />
                                        </RequiredAuth>
                                    } 
                                />
                                <Route 
                                    path="/query" 
                                    element={
                                        <RequiredAuth authed={authed}>
                                            <Styles.Query />
                                        </RequiredAuth>
                                    } 
                                />
                            </Routes>
                        </Router>
                    </Styles.Box>
                </AuthContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


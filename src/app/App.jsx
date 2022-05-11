import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RequiredAuth from './RequiredAuth';
import { useAuth, useTheme } from '../hooks'

import Styles from './styles'


export default function App(props) {

    // only hooks that will return Context will be used here
    // hooks that returns states will have conflict with lower level component states
    // and werid things will happen, like states get set one another gets set
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
                                            <Styles.Create ColorModeContext={ColorModeContext}/>
                                        </RequiredAuth>
                                    } 
                                />
                                <Route 
                                    path="/query" 
                                    element={
                                        <RequiredAuth authed={authed}>
                                            <Styles.Query ColorModeContext={ColorModeContext}/>
                                        </RequiredAuth>
                                    } 
                                />
                            </Routes>
                            <Styles.BackToTopButton />
                        </Router>
                    </Styles.Box>
                </AuthContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


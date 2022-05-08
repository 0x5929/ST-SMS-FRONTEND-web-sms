import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RequiredAuth from './RequiredAuth';
import useAuth from '../hooks/useAuth';
import useDrawer from '../hooks/useDrawer';

import Styles from './styles'


export default function App(props) {


    const {
        drawerOpen,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    } = useDrawer()


    const {
        AuthContext,
        authed,
        user,
        login,
        logout
    } = useAuth()


    

    return (
        <AuthContext.Provider value={{authed, user, login, logout}}>
            <Styles.AppMain>
                <Router>
                    <Styles.Header 
                        Link={Link}
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
            </Styles.AppMain>
        </AuthContext.Provider>
    );
}


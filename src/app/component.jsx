import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import useDrawer from '../hooks/useDrawer';

import Styles from './styles'


export default function App() {

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



    
    //
    // Link component and the user's auth info can be passed in from createContext, and useContext
    return (
        // add login logic
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
                    />
                    <Routes>
                        <Route path="/" element={<Styles.Query />} />
                        <Route path="/create" element={<Styles.Create />} />
                        <Route path="/signin" element={<Styles.Signin AuthContext={AuthContext} />} />
                    </Routes>
                </Router>
            </Styles.AppMain>
        </AuthContext.Provider>
    );
}


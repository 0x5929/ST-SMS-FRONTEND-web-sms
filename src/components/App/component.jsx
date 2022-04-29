import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import useDrawer from '../../hooks/useDrawer';

import Styles from './styles'


export default function App() {

    const {
        drawerOpen,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    } = useDrawer()


    return (
        // add login logic
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
                </Routes>
            </Router>
        </Styles.AppMain>
    );
}


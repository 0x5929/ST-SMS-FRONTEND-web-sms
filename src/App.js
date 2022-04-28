import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Query } from './features/Query/Query'
import { Create } from './features/Create'

import Controls from './components' 
import { styled } from '@mui/material';
import useDrawer from './controllers/drawerController';


const AppMain = styled('div')(( {theme} ) => ({
  // style css in js object format
  backgroundColor: '#f7f7f7'

}));


function App() {

    const {
        drawerOpen,
        toggleDrawer,
        anchorDirection, 
        menuIconColor,
        menuIconSize
    } = useDrawer()


    return (
        // add login logic
        <AppMain>
            <Router>
                <Controls.Header 
                    Link={Link}
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                    anchorDirection={anchorDirection}
                    menuIconColor={menuIconColor}
                    menuIconSize={menuIconSize}
                />
                <Routes>
                    <Route path="/" element={<Query />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </Router>
        </AppMain>
    );
}

export default App;


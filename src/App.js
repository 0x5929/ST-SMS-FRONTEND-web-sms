import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Query from './pages/Query/Query'
import Create from './pages/Create/Create'

import Controls from './components' 
import { styled, Switch } from '@mui/material';
import useDrawer from './controllers/drawerController';


const AppMain = styled('div')(( {theme} ) => ({
  // style css in js object format
  backgroundColor: '#f7f7f7'

}));


function App() {

    const {
        drawerOpen,
        setDrawerOpen,
        toggleDrawer,
    } = useDrawer()


    return (
        // add login logic
        <AppMain>
            <Router>
                <Controls.Header 
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                    toggleDrawer={toggleDrawer}
                    Link={Link}
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


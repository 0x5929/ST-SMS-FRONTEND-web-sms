import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Query from './pages/Query'
import Create from './pages/Create/Create'

import Controls from './components' 
import { styled } from '@mui/material';

const AppMain = styled('div')(( {theme} ) => ({
  // style css in js object format
  backgroundColor: '#f7f7f7'

}));


function App() {
  return (
    // add login logic
    <AppMain>
      <Controls.Header />
      <Router>
        <Routes>
          <Route path="/" element={<Query />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
    </AppMain>
  );
}

export default App;


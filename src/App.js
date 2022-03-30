import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css';
import Query from './pages/Query'
import Create from './pages/Create/Create'
import Create1 from './pages/Create/Create1'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Query />} />
        <Route path="/create" element={<Create1 />} />
      </Routes>
    </Router>
  );
}

export default App;

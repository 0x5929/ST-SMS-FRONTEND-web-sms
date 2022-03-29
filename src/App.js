import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css';
import Query from './pages/Query'
import Create from './pages/Create/Create'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Query />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;

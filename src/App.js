import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Query from './pages/Query'
import Create from './pages/Create/Create'



function App() {
  return (
    // add login logic
    <Router>
      <Routes>
        <Route path="/" element={<Query />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;


import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="dark">
      <Router>        
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center h-[90vh] md:h-full lg:h-full xl:h-full"><Login /></div>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;

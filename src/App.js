import './styles/tailwind.css';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashbordPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/auth/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage setLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <DashbordPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage setLoggedIn={setIsLoggedIn} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
  );
}

export default App;
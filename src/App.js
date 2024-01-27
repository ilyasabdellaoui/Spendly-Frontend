import './styles/tailwind.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashbordPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Auth/LoginPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginPage setLoggedIn={setIsLoggedIn} />}
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
          <Route path="test" element={<DashboardLayout/>}/>
        </Routes>
      </Router>
  );
}

export default App;
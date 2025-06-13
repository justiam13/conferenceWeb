import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MainLayout from './layouts/MainLayout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Components
// Header and Footer are now handled within MainLayout

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Header and Footer are now rendered inside MainLayout */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route 
                path="profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

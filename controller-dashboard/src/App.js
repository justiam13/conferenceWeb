import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NavbarManager from './components/NavbarManager';
import FooterManager from './components/FooterManager';
import Dashboard from './components/Dashboard';
import './styles/dashboard.css';

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Container fluid className="content-wrapper">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/navbar" element={<NavbarManager />} />
              <Route path="/footer" element={<FooterManager />} />
              <Route path="/settings" element={<div>Settings Page</div>} />
              <Route path="/logout" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;

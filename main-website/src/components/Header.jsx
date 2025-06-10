import React from 'react';
import { Container, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Re-import Navbar

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky-top">
      <Container>
        <BootstrapNavbar expand="lg" className="py-3">
          <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
            <span className="text-dark">Conference</span>
            <span className="text-primary">Hub</span>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Navbar /> {/* Render Navbar here */}
          </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
      </Container>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from "../services/api";

const Navbar = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/navbar")
      .then(res => {
        const visibleItems = res.data.filter(item => item.visible);
        visibleItems.forEach(item => {
          item.children = item.children?.filter(child => child.visible);
        });
        setItems(visibleItems);
      })
      .catch(err => console.error("Failed to fetch navbar:", err));
  }, []);

  return (
    <Nav className="ms-auto align-items-center">
      {items.map((item, idx) => (
        item.children && item.children.length > 0 ? (
          <NavDropdown 
            key={idx} 
            title={
              <Link 
                to={item.url} 
                className="text-decoration-none text-dark fw-medium px-2"
                onClick={(e) => e.stopPropagation()}
              >
                {item.title}
              </Link>
            } 
            id={`nav-dropdown-${idx}`}
            className="nav-item-custom"
          >
            {item.children.map((child, cidx) => (
              <NavDropdown.Item 
                key={cidx} 
                as={Link} 
                to={child.url}
                className="py-2"
              >
                {child.title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        ) : (
          <Nav.Link 
            key={idx} 
            as={Link} 
            to={item.url}
            className="text-dark fw-medium px-3"
          >
            {item.title}
          </Nav.Link>
        )
      ))}
      <Nav.Link 
        as={Link} 
        to="/contact"
        className="btn btn-primary ms-3 px-4 py-2 rounded-pill"
      >
        Get Started
      </Nav.Link>
    </Nav>
  );
};

export default Navbar;

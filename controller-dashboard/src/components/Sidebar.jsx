import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaSitemap,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when clicking a menu item on mobile
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleSidebar}
        className="hamburger-btn"
        aria-label="Toggle sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-brand" onClick={closeSidebar}>
            <FaBars className="me-2" />
            Dashboard
          </a>
        </div>
        <div className="sidebar-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaChartLine />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/navbar"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaSitemap />
            <span>Navbar Manager</span>
          </NavLink>
          <NavLink
            to="/footer"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaFileAlt />
            <span>Footer Manager</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
          <a href="/logout" className="sidebar-item" onClick={closeSidebar}>
            <FaSignOutAlt />
            <span>Logout</span>
          </a>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

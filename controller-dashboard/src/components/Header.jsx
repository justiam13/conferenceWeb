import React from 'react';
import { FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="dashboard-header">
      <h1 className="header-title">Dashboard</h1>
      <div className="header-actions">
        <button className="btn btn-link text-dark position-relative">
          <FaBell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-link text-dark dropdown-toggle d-flex align-items-center"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUser className="me-2" />
            <span>Admin</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/settings">
                Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header; 
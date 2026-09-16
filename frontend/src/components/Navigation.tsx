import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar navbar-default">
      <NavLink to="/" className="navbar-brand">
        Brand
      </NavLink>

      <ul className="nav navbar-nav">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/list-todos.do" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Todos
          </NavLink>
        </li>
        <li>
          <a href="http://www.in28minutes.com" target="_blank" rel="noopener noreferrer">
            In28Minutes
          </a>
        </li>
      </ul>

      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="/logout.do" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
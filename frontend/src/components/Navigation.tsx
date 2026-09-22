import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Navigation: React.FC = () => {
  const location = useLocation();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    AuthService.logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-default">
      <a href="/" className="navbar-brand">
        Brand
      </a>

      <ul className="nav navbar-nav">
        <li className={isActive('/') ? 'active' : ''}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={isActive('/list-todos.do') ? 'active' : ''}>
          <NavLink to="/list-todos.do">Todos</NavLink>
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
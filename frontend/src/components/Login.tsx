import React, { useState, FormEvent } from 'react';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(name, password);
      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      } else {
        // Assuming successful login results in a redirect or session creation.
        // Navigate to home or protected page.
        navigate('/');
      }
    } catch (err) {
      // Network or unexpected error
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <>
      <nav className="navbar navbar-default">
        <a href="/" className="navbar-brand">
          Brand
        </a>
        <ul className="nav navbar-nav">
          <li className="active">
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/list-todos.do">Todos</a>
          </li>
          <li>
            <a href="http://www.in28minutes.com">In28Minutes</a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="/login.do">Login</a>
          </li>
        </ul>
      </nav>

      <div className="container">
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p>
              <font color="red">{errorMessage}</font>
            </p>
          )}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>

      <footer className="footer" style={{ position: 'absolute', bottom: 0, width: '100%', height: 60, backgroundColor: '#f5f5f5' }}>
        <div>footer content</div>
      </footer>
    </>
  );
};

export default Login;
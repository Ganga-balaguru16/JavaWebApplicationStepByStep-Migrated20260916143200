import React, { useState } from 'react';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(name, password);
      // If the backend redirects (e.g., on successful login), axios follows it.
      // In that case, we can navigate to the home page.
      if (response.status === 200) {
        // Check if backend sent an errorMessage in JSON.
        if (response.data && response.data.errorMessage) {
          setErrorMessage(response.data.errorMessage);
        } else {
          // Assume login succeeded; redirect to home.
          navigate('/');
        }
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error: any) {
      // If the server returns a non‑2xx status with JSON payload.
      if (error.response && error
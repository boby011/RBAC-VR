import React, { useState } from 'react';
import './RBAC.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.email || !data.password) {
      toast.error('Email and password are required.');
      return;
    }

    setLoading(true); 

    try {
      // Admin login logic
      if (data.email === 'admin@gmail.com' && data.password === 'admin') {
        window.alert('Admin Login Success');
        localStorage.setItem('email', data.email);
        navigate('/admindashboard');
        return;
      }

      // User login logic (to be handled via mock API)
      const response = await axios.post('http://localhost:3000/users', {
        email: data.email,
        password: data.password
      });

      if (response.data) {
        // Assuming the mock API returns a user object on success
        localStorage.setItem('user', JSON.stringify(response.data)); // Store user info in localStorage
        toast.success('Login successful');
        navigate('/usernav/userhome'); // Navigate to user dashboard
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Network error. Please try again.');
        console.error('Error:', error);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="login-box">
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              value={data.email}
              required
              disabled={loading}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
              value={data.password}
              required
              disabled={loading}
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import type { User } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get<User>(
          `${API_BASE_URL}/api/auth/status`,
          { withCredentials: true }
        );
        if (response.data && response.data._id) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/auth0`;
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <div>당신이 상상하는 모든 것.</div>
      </header>
      <main>
        <Outlet />
      </main>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

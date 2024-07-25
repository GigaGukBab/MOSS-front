import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

interface User {
  _id: string;
  username: string;
  auth0Id: string;
  __v: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav>
        <ul>
          <button>
            <Link to="/">Home</Link>
          </button>
          <button>
            <Link to="/dashboard">Dashboard</Link>
          </button>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </ul>
      </nav>

      {/* ... (rest of the component) */}
    </div>
  );
}

export default App;

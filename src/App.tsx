import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css';

interface User {
  _id: string;
  username: string;
  auth0Id: string;
  __v: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

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

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/protected">Protected Page</Link></li>
            {user ? (
              <li><button onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        <h1>Welcome to the App</h1>
        {user ? (
          <p>Hello, {user.username}!</p>
        ) : (
          <p>Please log in to access protected content.</p>
        )}
        
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
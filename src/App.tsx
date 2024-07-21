import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

interface User {
  username: string;
  // 필요한 다른 속성들도 여기에 추가
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        'https://port-0-moss-lyu6qvc4ff667282.sel4.cloudtype.app/api/auth/status'
      );
      setUser(response.data);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href =
      'https://port-0-moss-lyu6qvc4ff667282.sel4.cloudtype.app/api/auth/auth0';
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://port-0-moss-lyu6qvc4ff667282.sel4.cloudtype.app/api/auth/logout'
      );
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MOSS</h1>
      <div className="card">
        {user ? (
          <>
            <h1>환영합니다, {user.username}님!!!</h1>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <button onClick={handleLogin}>로그인하기</button>
        )}
      </div>
    </>
  );
}

export default App;

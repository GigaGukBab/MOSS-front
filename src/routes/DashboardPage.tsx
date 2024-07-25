import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  auth0Id: string;
  __v: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function Dashboard() {
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
        navigate('/'); // 인증되지 않은 사용자를 홈페이지로 리다이렉트
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setUser(null);
      navigate('/'); // 에러 발생 시 홈페이지로 리다이렉트
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // 이미 navigate('/') 했으므로 여기서는 아무것도 렌더링하지 않습니다.
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      {/* 대시보드의 다른 내용들... */}
    </div>
  );
}

export default Dashboard;

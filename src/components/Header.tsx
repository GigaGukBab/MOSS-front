import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-menubar">
        <nav className="nav-container">
          <button
            onClick={() => {
              navigate('dashboard');
            }}
          >
            대시보드로
          </button>
          <button
            onClick={() => {
              navigate('menu1');
            }}
          >
            메뉴1
          </button>
          <button
            onClick={() => {
              navigate('menu2');
            }}
          >
            메뉴2
          </button>
          <button
            onClick={() => {
              navigate('menu3');
            }}
          >
            메뉴3
          </button>
          <button
            onClick={() => {
              navigate('menu4');
            }}
          >
            메뉴4
          </button>
        </nav>
      </div>
    </header>
  );
}

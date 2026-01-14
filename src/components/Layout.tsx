import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { 
  SquaresFour, 
  MicrophoneStage, 
  UserCircle, 
  Clock,
  SignOut,
  Lightning
} from 'phosphor-react';
import './layout.css';

export const Layout: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="layout-wrapper">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Lightning size={32} weight="fill" color="var(--color-secondary)" />
          <span>PolyglotPitch</span>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <SquaresFour size={24} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/train" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <MicrophoneStage size={24} />
            <span>Practice</span>
          </NavLink>

          <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Clock size={24} />
            <span>History</span>
          </NavLink>

          <div className="nav-spacer"></div>

          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <UserCircle size={24} />
            <span>Profile</span>
          </NavLink>
          
          <button onClick={handleLogout} className="nav-item btn-logout">
            <SignOut size={24} />
            <span>Sign Out</span>
          </button>
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar">
            {currentUser?.displayName?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser?.displayName || 'User'}</span>
            <span className="user-email">{currentUser?.email}</span>
          </div>
        </div>
      </aside>

      <main className="content-area">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { Link, useNavigate,Outlet } from 'react-router-dom';
import './RBAC.css';

const AdminNav = () => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); 
    navigate(`/login`); 
    
  };

  return (
    <>
      <div className="admin-nav">
        <div className="admin-head">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-list">
          {/* Logout button */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminNav;

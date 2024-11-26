import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./RBAC.css";

const AdminDashboard = () => {
  const [data, setData] = useState({
    users: [],
    roles: [],
    permissions: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users, roles, and permissions from the mock API
        const usersResponse = await axios.get("http://localhost:3000/users");
        const rolesResponse = await axios.get("http://localhost:3000/roles");
        const permissionsResponse = await axios.get("http://localhost:3000/permissions");

        setData({
          users: usersResponse.data,
          roles: rolesResponse.data,
          permissions: permissionsResponse.data
        });
      } catch (error) {
        toast.error("Failed to fetch data from mock API.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <NavLink to="/manageusers" activeClassName="active-link">
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/manageroles" activeClassName="active-link">
              Manage Roles
            </NavLink>
          </li>
          <li>
            <NavLink to="/managepermissions" activeClassName="active-link">
              Manage Permissions
            </NavLink>
          </li>
         
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome, Admin</h1>
        <div className="stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{data.users.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Roles</h3>
            <p>{data.roles.length}</p>
          </div>
          <div className="stat-card">
            <h3>Permissions</h3>
            <p>{data.permissions.length}</p>
          </div>
        </div>

        
      
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;

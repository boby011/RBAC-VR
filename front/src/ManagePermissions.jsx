import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RBAC.css';

const ManagePermissions = () => {
  const [permissionList, setPermissionList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('http://localhost:3000/permissions');
        const data = await response.json();
        setPermissionList(data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);
  const goBackToHome = () => {
    navigate("/admindashboard");
  };

  return (
    <div className="manage-permissions">
      <h2 className="h2-mu">Manage Permissions</h2>
      {permissionList.length === 0 ? (
        <p>No permissions available.</p>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Permission</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {permissionList.map((permission) => (
                <tr key={permission.id}>
                  <td>{permission.id}</td>
                  <td>{permission.permission}</td>
                  <td>{permission.description || 'No description available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       <div className="go-back-container">
        <button className="go-back-button" onClick={goBackToHome}>
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ManagePermissions;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RBAC.css';

const ManageRoles = () => {
  const [roleList, setRoleList] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/roles');
        const data = await response.json();
        setRoleList(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const goBackToHome = () => {
    navigate("/admindashboard");
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add new role
  const handleAddRole = async (e) => {
    e.preventDefault();
    if (newRole.name.trim() === '') {
      alert('Role name is required!');
      return;
    }

    try {
      // Send POST request to add the new role to the mock API
      const response = await fetch('http://localhost:3000/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });

      if (response.ok) {
        const addedRole = await response.json();
        setRoleList((prevRoles) => [...prevRoles, addedRole]);
        setNewRole({ name: '', description: '' }); // Reset form
      } else {
        console.error('Failed to add role');
      }
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  // Handle role deletion
  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/roles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRoleList(roleList.filter((role) => role.id !== id));
      } else {
        console.error('Failed to delete role');
      }
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div className="manage-roles">
      <h2 className="h2-mu">Manage Roles</h2>

      {/* Role Add Form */}
      <div className="role-form">
        <h3>Add New Role</h3>
        <form onSubmit={handleAddRole}>
          <div className="form-group">
            <label htmlFor="roleName">Role Name:</label>
            <input
              type="text"
              id="roleName"
              name="name"
              value={newRole.name}
              onChange={handleInputChange}
              required
              placeholder="Enter role name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleDescription">Description:</label>
            <textarea
              id="roleDescription"
              name="description"
              value={newRole.description}
              onChange={handleInputChange}
              placeholder="Enter role description"
            />
          </div>
          <button type="submit" className="submit-button">Add Role</button>
        </form>
      </div>

      {/* Role List */}
      {roleList.length === 0 ? (
        <p>No roles available.</p>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Role Name</th>
                <th>Description</th>
                <th>Action</th> {/* Added Action column for delete button */}
              </tr>
            </thead>
            <tbody>
              {roleList.map((role) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>{role.description || 'No description available'}</td>
                  <td>
                    {/* Delete button */}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      Delete
                    </button>
                  </td>
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

export default ManageRoles;

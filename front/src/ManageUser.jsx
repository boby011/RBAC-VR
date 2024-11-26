import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./RBAC.css";

const ManageUsers = () => {
  const [userList, setUserList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const usersData = await response.json();
        setUserList(usersData);
      } catch (error) {
        toast.error("Error fetching data from the server.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        });
        const updatedUsers = userList.filter((user) => user.id !== id);
        setUserList(updatedUsers);
        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error("Error deleting user.");
      }
    }
  };

  const handleStatusToggle = async (id) => {
    const updatedUsers = userList.map((user) =>
      user.id === id ? { ...user, status: user.status === "Active" ? "Not Active" : "Active" } : user
    );
    setUserList(updatedUsers);
    toast.success("User status updated successfully!");

    const userToUpdate = updatedUsers.find(user => user.id === id);
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToUpdate),
      });
    } catch (error) {
      toast.error("Error updating status.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedUserData({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      const updatedUsers = userList.map((user) =>
        user.id === editingUser.id ? { ...user, ...updatedUserData } : user
      );
      setUserList(updatedUsers);
      setEditingUser(null);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Error updating user.");
    }
  };

  const goBackToHome = () => {
    navigate("/admindashboard");
  };

  return (
    <div className="manage-users">
      <h2 className="h2-mu">Manage Users</h2>
      {userList.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "User"}</td>
                  <td>
                    <button
                      className={`status-button ${
                        user.status === "Active" ? "active" : "not-active"
                      }`}
                      onClick={() => handleStatusToggle(user.id)}
                    >
                      {user.status || "Not Active"}
                    </button>
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
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

      {/* Edit  Form */}
      {editingUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <form onSubmit={handleUpdate}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedUserData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded-md"
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedUserData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded-md"
            />
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={updatedUserData.role}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded-md"
            />
            <label>Status:</label>
            <select
              name="status"
              value={updatedUserData.status}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Not Active">Not Active</option>
            </select>
            <button type="submit" className="save-button mt-4">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button mt-2"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          </form>
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

export default ManageUsers;

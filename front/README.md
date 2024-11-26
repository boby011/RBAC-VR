# Admin Dashboard with Role-Based Access Control (RBAC)

## Project Overview

This project is an **Admin Dashboard** built using the **MERN stack** with a mock API for managing **users, roles, and permissions**. The dashboard provides an interface to:

- View dashboard statistics for users, roles, and permissions.
- Manage roles and permissions directly from the admin interface.

---

## Features

### Admin Dashboard
- Displays total counts for users, roles, and permissions.

### Manage Roles
- View all available roles dynamically fetched from the mock API.

### Manage Permissions
- View all available permissions dynamically fetched from the mock API.

### Dynamic Views
- Sidebar navigation allows switching between Dashboard, Manage Roles, and Manage Permissions without navigating away.

### Mock API Integration
- Simulated backend using `db.json` to mimic database functionality.

### Error Handling
- Notifications using `react-toastify` for better user experience when an error occurs.

### Responsive Design
- Optimized for various screen sizes using **CSS**.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [json-server](https://github.com/typicode/json-server)

### Installation Steps

1. **Clone the repository**:
  
 

2. **Install dependencies**:

3. **Set up the mock API**:
Create a file named `db.json` in the root directory with the following structure:

{
  "users": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" }
  ],
  "roles": [
    { "id": 1, "name": "Admin" },
    { "id": 2, "name": "Editor" }
  ],
  "permissions": [
    { "id": 1, "name": "Read" },
    { "id": 2, "name": "Write" },
    { "id": 3, "name": "Delete" }
  ]
}--

4. **Clone the repository**:
   
  

   5. Start server
npx json-server --watch db.json --port 3000  

 # Admin Dashboard with Role-Based Access Control (RBAC)

---

### Dashboard Statistics
The main page shows the total number of:
- **Users**: Data fetched from the users endpoint in `db.json`.
- **Roles**: Data fetched from the roles endpoint.
- **Permissions**: Data fetched from the permissions endpoint.

### Manage Roles
- Displays all roles fetched from the mock API.
- Provides a base for future role management functionalities like adding or editing roles.

### Manage Permissions
- Displays all permissions fetched from the mock API.
- Provides a base for future permission management functionalities.

### Error Handling
- **Notifications**: Displays an error toast message if the API fails to fetch data.
- **User Experience**: Ensures smooth handling of errors without crashing the application.

## Technologies Used
- **React.js**: Frontend framework for building the user interface.
- **Axios**: For making API calls to the mock server.
- **json-server**: Mock API for simulating backend endpoints.
- **react-toastify**: Notifications for error handling and alerts.
- **CSS**: For styling and responsive design.

## Future Enhancements
Add functionality to:
- Create, edit, and delete roles and permissions.
- Assign roles to users dynamically.
- Implement real authentication and authorization.
- Enhance the design with more detailed statistics and graphs.

import React from 'react';
import "../css/style.css";
import { useState } from 'react';
import Navbar from '../common/navbar';
import Sidenav from '../common/sidenav';
import Footer from '../common/footer';



const Configuration = () => {
  const [users, setUsers] = useState([
    { id: 10001, name: 'Dr. Musharraf Ahmed', role: 'admin', permissions: ['create', 'delete', 'update'] },
    { id: 11065, name: 'Abdul Sami', role: 'editor', permissions: ['create', 'update'] },
    { id: 19686, name: 'Hassan Ali', role: 'viewer', permissions: ['read'] },
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
  };

  const handlePermissionChange = (userId, permission, isChecked) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          let updatedPermissions;
          if (isChecked) {
            updatedPermissions = [...user.permissions, permission];
          } else {
            updatedPermissions = user.permissions.filter((p) => p !== permission);
          }
          return { ...user, permissions: updatedPermissions };
        }
        return user;
      })
    );
  };

  return (
    <div className="wrapper">
    {/* Navbar */}
    <Navbar />
    {/* /.navbar */}
     <Sidenav />
   <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
        <h1>System Configuration</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Configuration</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
    <div className="container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={user.permissions.includes('create')}
                    onChange={(e) =>
                      handlePermissionChange(user.id, 'create', e.target.checked)
                    }
                  />
                  Create
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={user.permissions.includes('read')}
                    onChange={(e) => handlePermissionChange(user.id, 'read', e.target.checked)}
                  />
                  Read
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={user.permissions.includes('update')}
                    onChange={(e) =>
                      handlePermissionChange(user.id, 'update', e.target.checked)
                    }
                  />
                  Update
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={user.permissions.includes('delete')}
                    onChange={(e) =>
                      handlePermissionChange(user.id, 'delete', e.target.checked)
                    }
                  />
                  Delete
                </label>
              </td>
              <td>
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    <Footer />
    </div>
  );
};


export default Configuration;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Tidak ada token, Harap Login.!!');
        }
        const response = await axios.get("https://web-app-auth.up.railway.app/users", {
          headers: {
            Authorization : `Bearer ${token}`
          }, withCredentials: true
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error get users:", error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
      getUsers(); 
  }, [navigate]);

  

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Tidak ada token, Harap Login.!!');
        }
      await axios.delete(`https://web-app-auth.up.railway.app/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, withCredentials: true
      });
      setUsers(users.filter(user => user.userId !== userId));
      alert('Patient deleted successfully!');
    } catch (error) {
      console.error("Error deleting patient:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        alert('Failed to delete the patient. Please try again.');
      }
    }
    navigate('/dashboard')
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1 }</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
              <button
              className="button is-info is-small"
              onClick={() => navigate(`/users/edit/${user.id}`)}>
                Edit
                </button>
                <button onClick={() => deleteUser(user.id)}
                  className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
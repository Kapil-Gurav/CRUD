import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import './Home.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [spUsers, setSpUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    application_name: "",
    hall_name: "",
    email: "",
    mobile: "",
    start_date: "",
    end_date: "",
    rent: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const getalluserssp = async () => {
    const result = await axios.get("http://localhost:8080/userssp");
    setSpUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };

  const deleteUsersp = async (id) => {
    await axios.delete(`http://localhost:8080/usersp/${id}`);
    getalluserssp();
  };

  // New functions for update functionality
  const startEditing = (user) => {
    setEditingUser(user.id);
    setUpdatedData({
      application_name: user.application_name,
      hall_name: user.hall_name,
      email: user.email,
      mobile: user.mobile,
      start_date: user.start_date,
      end_date: user.end_date,
      rent: user.rent
    });
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setUpdatedData({
      application_name: "",
      hall_name: "",
      email: "",
      mobile: "",
      start_date: "",
      end_date: "",
      rent: ""
    });
  };

  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value
    });
  };

  const updateUsersp = async (id) => {
    try {
      await axios.put(`http://localhost:8080/usersp/${id}`, updatedData);
      setEditingUser(null);
      getalluserssp();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2>Customer Details</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.R</th>
              <th scope="col">Applicant_name</th>
              <th scope="col">Hall_name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.application_name}</td>
                <td>{user.hall_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View Details
                  </Link>
                  {/* <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link> */}
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete Entry
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Edit Customer Venue</h2>
        <button className="btn btn-primary my-3" onClick={getalluserssp}>
          Customer List
        </button>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.R</th>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th scope="col">Hall Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {spUsers.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="email"
                      value={updatedData.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="hall_name"
                      value={updatedData.hall_name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    user.hall_name
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => updateUsersp(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary mx-2"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => startEditing(user)}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteUsersp(user.id)}
                      >
                        Delete
                      </button> */}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
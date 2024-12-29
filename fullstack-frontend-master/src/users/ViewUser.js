import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './ViewUser.css'

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    start_date: "",
    end_date: "",
    rent: "",
    additional_charges: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>application_name:</b> {user.application_name}
                </li>
                <li className="list-group-item">
                  <b>hall_name:</b> {user.hall_name}
                </li>
                <li className="list-group-item">
                  <b>Email:</b> {user.email}
                </li>
                <li className="list-group-item">
                  <b>Mobile:</b> {user.mobile}
                </li>
                <li className="list-group-item">
                  <b>Start Date:</b> {user.start_date}
                </li>
                <li className="list-group-item">
                  <b>End Date:</b> {user.end_date}
                </li>
                <li className="list-group-item">
                  <b>Rent:</b> {user.rent}
                </li>
             
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
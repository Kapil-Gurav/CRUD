import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddUser.css'

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    application_name: "",
    hall_name: "",
    email: "",
    mobile: "",
    start_date: "",
    end_date: "",
    rent: "",
  });
  
  const { application_name, hall_name, email, mobile, start_date, end_date, rent } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="application_name" className="form-label">
              application_name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your application_name"
                name="application_name"
                value={application_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="hall_name" className="form-label">
              hall_name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your hall_name"
                name="hall_name"
                value={hall_name}
                onChange={(e) => onInputChange(e)}
              />
            </div> */}
            <div className="mb-3">
  <label htmlFor="hall_name" className="form-label">
    Hall Name
  </label>
  <select
    className="form-control"
    name="hall_name"
    value={hall_name}
    onChange={(e) => onInputChange(e)}
  >
    <option value="" disabled>
      Select a hall
    </option>
    <option value="Hall A">Hall A</option>
    <option value="Hall B">Hall B</option>
    <option value="Hall C">Hall C</option>
    <option value="Hall D">Hall D</option>
    <option value="Hall E">Hall E</option>
  </select>
</div>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Mobile" className="form-label">
                Mobile
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Start_date" className="form-label">
              Start_date
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter your start_date"
                name="start_date"
                value={start_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="End_date" className="form-label">
              End_date
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter your end_date"
                name="end_date"
                value={end_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Rent" className="form-label">
              Rent
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your rent"
                name="rent"
                value={rent}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
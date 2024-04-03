import React, { useState } from "react";
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../App.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNo: "",
    userLocation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup",
        formData
      );
      console.log(response.data);
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // Reset form fields after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNo: "",
      userLocation: ''
    });
  };

  return (
    /* Navigation Bar */
    <div className="welcome">
      <nav className="homeNav">
        <div className="sign">
          <button className="signIn">Login</button>
          <Link to="/login">Login</Link>
          <button className="signUp">Sign up</button>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="hero">
        <div className="col-1">
          <h1 className="tok"> Welcome to Simple Management Project</h1>
        </div>
        <div className="cols-2">
          <form onSubmit={handleSubmit}>
            <div className="name-inputs">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="text"
                name="name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="email-inputs">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="text"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </div>
            <div className="pass-inputs">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="text"
                name="password"
                placeholder="Password"
                min="8"
                max="20"
                value={formData.password}
                onChange={handleChange}
              ></input>
            </div>
            <div className="passcon-inputs">
              <label htmlFor="passwordcon">Confirm Password</label>
              <input
                type="password"
                id="text"
                name="passwordConfirm"
                placeholder="Password Confirm"
                min="8"
                max="20"
                value={formData.passwordConfirm}
                onChange={handleChange}
              ></input>
            </div>
            <div className="phone-inputs">
              <label htmlFor="phone">Contact</label>
              <input
                type="phone"
                id="string"
                name="phoneNo"
                placeholder="Contact"
                min="11"
                max="14"
                value={formData.phoneNo}
                onChange={handleChange}
              ></input>
              </div>
               <div className="location-input">
              <label htmlFor="location">Location</label>
              <input
                type="location"
                id="string"
                name="userLocation"
                placeholder="Location"
                value={formData.userLocation}
                onChange={handleChange}
              ></input>
            </div>
            <button>
              <span className="signin">Sign Up</span>{" "}
                  </button> 
          </form>
        </div>
      </div>
      {/* END OF HERO SECTION */}
    </div>
  );
}

export default SignUp;

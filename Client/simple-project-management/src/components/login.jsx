import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../login.css"

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        loginData
      );
      console.log(response.data); 
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // Reset form fields after submission
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="welcome">
        <nav className="homeNav">
          <div className="sign">
            <button className="signIn">Login</button>
            <button className="signUp">Sign up</button>
          </div>
        </nav>
        {/* Hero Section */}
        <div className="hero">
          <div className="col-1">
            {/* <img src={Logo} alt="logo" /> */}
            <h1 className="tok"> Welcome to Simple Management Project</h1>
          </div>
          <div className="col-2">
            <form onSubmit={handleSubmit}>
              <div className="email-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="text"
                  name="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="pass-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="text"
                  name="password"
                  placeholder="Password"
                  min="8"
                  max="20"
                  value={loginData.password}
                  onChange={handleChange}
                ></input>
                <button>
                  <span>Login</span>{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* END OF HERO SECTION */}
      </div>
    </>
  );
}

export default Login;

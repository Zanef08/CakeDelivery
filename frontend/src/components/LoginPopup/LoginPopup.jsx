import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { notification } from "antd";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      notification.error({
        message: "Invalid email address",
      });
      return false;
    }
    if (formData.password.length < 6) {
      notification.error({
        message: "Password must be at least 6 characters long",
      });
      return false;
    }
    if (currState === "Sign Up" && formData.name.trim() === "") {
      notification.error({
        message: "Name cannot be empty",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    let endpoint =
      url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

    try {
      const response = await axios.post(endpoint, formData);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        notification.error({
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error during login/register:", error);
      notification.error({
        message: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            aria-label="Close"
          >
            <img src={assets.cross_icon} alt="Close" />
          </button>
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              type="text"
              placeholder="Your name..."
              required
            />
          )}
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            placeholder="Your email..."
            required
          />
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            placeholder="********"
            required
          />
        </div>
        <button type="submit" className="button">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I accept the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

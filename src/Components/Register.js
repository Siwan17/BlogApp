import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUserDetails } from "../slices/userDetails";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicFile, setProfilePicFile] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login_token = cookies.get("login-token");

  const handleSignUp = async (e) => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      city,
      phone: phoneNumber,
      email,
      profile_image: profilePicFile,
    };

    try {
      const result = await axios.post(
        "http://110.227.208.185/api/practical_2/register",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status === 200) {
        const {
          data: { data },
        } = result || {};
        const { token, your_password, first_name, last_name, email } =
          data || {};
        cookies.set("login-token", token);
        localStorage.setItem("user-email", email);
        dispatch(
          setUserDetails({ first_name, last_name, your_password, email })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (login_token) {
    return <Navigate to={"/"} replace />; // Avoid rendering the rest of the component
  }

  return (
    <div className="main-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>

        <div className="mb-3">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div> */}

        <div className="mb-3">
          <label>Profile Picture</label>
          <input
            type="file"
            className="form-control"
            placeholder="Select Profile Picture"
            onChange={(e) => {
              setProfilePic(e.target.value);
              setProfilePicFile(e.target.files[0]);
            }}
            value={profilePic}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        {/* <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p> */}
      </form>
    </div>
  );
};

export default Register;

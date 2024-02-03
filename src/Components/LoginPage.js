import React, { useState } from "react";
import cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../slices/userDetails";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login_token = cookies.get("login-token");

  const handleSignIn = async () => {
    const userData = {
      email,
      password,
    };
    try {
      const result = await axios.post(
        "http://110.227.208.185/api/practical_2/login",
        userData
      );
      if (result.status === 200) {
        const {
          data: { data },
        } = result || {};
        const { token, first_name, last_name, email } = data || {};
        cookies.set("login-token", token);
        dispatch(setUserDetails({ first_name, last_name, email }));
        localStorage.setItem("user-email", email);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Directly check for login_token and navigate if present
  if (login_token) {
    return <Navigate to={"/"} replace />; // Avoid rendering the rest of the component
  }

  return (
    <div className="main-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          No account <a href="/register">Sign up here?</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

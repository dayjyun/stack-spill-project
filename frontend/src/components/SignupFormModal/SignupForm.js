import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/sessionReducer";
import DemoUserButton from "../DemoComponent/DemoUserButton";
import LoginForm from "../LoginFormModal/LoginForm";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(["Passwords do not match"]);
  };

  return (
    <>
      <div id="signup-form-container">
        <div id="signup-form-text">Stack Spill</div>
        <form onSubmit={handleSubmit} id="signup-form">
          <p>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </p>
          <div className="signup-form-div">
            <input
              type="text"
              value={firstName}
              placeholder="Enter Your First Name"
              className="signup-form-input"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-div">
            <input
              type="text"
              value={lastName}
              placeholder="Enter Your Last Name"
              className="signup-form-input"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-div">
            <input
              type="text"
              value={email}
              placeholder="Enter Your Email"
              className="signup-form-input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-div">
            <input
              type="text"
              value={username}
              placeholder="Enter Your Username"
              className="signup-form-input"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-div">
            <input
              type="password"
              value={password}
              placeholder="Enter Your Password"
              className="signup-form-input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-div">
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Your Password"
              className="signup-form-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button id="sf-buttons" type="submit">
            Sign Up
          </button>
        </form>
        <div id="signup-form-demo">
          <div id='signup-form-demo-text'>Try out the Demo User?</div>
          <div id="demo-user-button-signup-form">
            <DemoUserButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;

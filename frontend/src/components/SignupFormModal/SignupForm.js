import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/sessionReducer";
import DemoUserButton from "../DemoComponent/DemoUserButton";
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
    return setErrors([
      "Passwords do not match",
    ]);
  };

  return (
    <>
    <div id="signup-form-text-container">
      <div className="signup-form-text title">Stack Spill</div>
      <div className="signup-form-text">Join Our Community</div>
      <div className="signup-form-text">Enter Your Details Below</div>
    </div>
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
            placeholder="First Name"
            className="signup-form-input"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-div">
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            className="signup-form-input"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-div">
          <input
            type="text"
            value={email}
            placeholder="Email"
            className="signup-form-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-div">
          <input
            type="text"
            value={username}
            placeholder="Email"
            className="signup-form-input"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-div">
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="signup-form-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-div">
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            className="signup-form-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button id="sf-buttons" type="submit">
          Sign Up
        </button>
      </form>
      <div id="demo-user-button-signup-form">
        <DemoUserButton />
      </div>
    </>
  );
}

export default SignupForm;

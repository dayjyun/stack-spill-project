import React, { useState } from "react";
import * as sessionActions from "../../store/sessionReducer";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DemoUserButton from "../DemoComponent/DemoUserButton";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        return setErrors(["Login Failed. Try Again"])
      }
      );
    };

  return (
    <>
      <div id="login-form-container">
        <div id="login-form-text">Login</div>
        <form onSubmit={handleSubmit} id="login-form">
          <p>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </p>
          <div className="login-form-div">
            <input
              type="text"
              value={credential}
              placeholder="Username or Email"
              className="login-form-input"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div className="login-form-div">
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="login-form-input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div id="login-form-buttons">
            <button id="lfb-login" type="submit">
              Log In
            </button>
          </div>
        </form>
        <div id="login-form-demo">
          <div id='login-form-demo-text'>Try out the Demo User?</div>
          <div id="demo-user-button-login-form">
            <DemoUserButton
              credential={credential}
              password={password}
              setErrors={setErrors}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

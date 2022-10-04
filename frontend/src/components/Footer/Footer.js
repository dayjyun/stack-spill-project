import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div id="footer-container">
        <div id="footer-logo-left">
          <div id="footer-logo-home">
            <NavLink exact to="/">
              <img
                id="footer-logo-image"
                src="https://stack-spill-project.s3.us-east-2.amazonaws.com/icons8-pancake-stack-96-white.png"
                alt="webpage logo"
              />
              <div id="footer-logo-text">Stack Spill</div>
            </NavLink>
          </div>
          <div id="footer-logo-left-navLinks">
            <NavLink to="/">Questions</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </div>
        <div id="footer-my-info">
          <h1>Me</h1>
        </div>
      </div>
    </>
  );
}

export default Footer;

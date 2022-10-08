import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SearchBarComponent from "../SearchBar/SearchBar";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <>
      <div>
        <div id="navigation-bar">
          <div id="navigation-navLinks">
            <div id="navigation-navLinks-left">
              <NavLink id={"navigation-home"} exact to="/">
                <img
                  id="navigation-navLink-image"
                  src="https://stack-spill-project.s3.us-east-2.amazonaws.com/icons8-pancake-stack-100.png"
                  alt="webpage logo"
                />
                <div id="navigation-navLink-text">Stack Spill</div>
              </NavLink>
              <NavLink id={"navigation-about"} to="/users">
                Users
              </NavLink>
            </div>
            <div id="search-bar-div">
              <SearchBarComponent />
            </div>
            <div id="navigation-navLinks-right">{isLoaded && sessionLinks}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;

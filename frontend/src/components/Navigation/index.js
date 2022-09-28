import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
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
    <div id='navigation-bar'>
        {/* Side Menu: Questions, Users */}
        <div id="navigation-navlinks">
          <NavLink id={'navigation-home'} exact to="/">Home</NavLink>
          <NavLink id={'navigation-about'} to="/about">About</NavLink>
          {/* <NavLink to="/users">Users</NavLink> */}
          {isLoaded && sessionLinks}
        </div>
        {/* <h1>Search Bar</h1> */}
        {/* Dark Mode Button */}
    </div>
  );
}

export default Navigation;

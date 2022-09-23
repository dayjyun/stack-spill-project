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
    <ul>
      <li>
        {/* Pop Out Side Menu: Questions, Users */}
        <NavLink exact to="/">Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/users'>Users</NavLink>
        {/* <h1>Search Bar</h1> */}
        {/* Dark Mode Button */}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/sessionReducer";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div id="profile-button-component">
        <button id="profile-image-button" onClick={openMenu}>
          <img id="profile-button-image" src={user?.profileImage} />
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user?.username}</li>
            <li>{user?.email}</li>
            <Link to={`/users/${user?.id}`}>
              <button id='profile-button-profile'>Profile</button>
            </Link>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileButton;

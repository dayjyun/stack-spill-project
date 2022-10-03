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
            {/* <li>{user?.email}</li> */}
            <div id='profile-button-links'>
              <Link id="profile-button-profile-link" to={`/users/${user?.id}`}>
                <div id="profile-button">
                  <i className="fa-regular fa-user"></i>
                  <div className="pb-text">Profile</div>
                </div>
              </Link>
              <div id="profile-button-logout" onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <div className="pb-text">Log Out</div>
              </div>
            </div>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileButton;

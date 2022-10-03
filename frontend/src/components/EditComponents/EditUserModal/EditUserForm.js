import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../store/usersReducer";
import "./EditUserForm.css";

function EditUserForm({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const defaultImage =
    "https://stack-spill-project.s3.us-east-2.amazonaws.com/stack-spill-default-profile-image.png";
  const [firstName, setFirstName] = useState(sessionUser?.firstName);
  const [lastName, setLastName] = useState(sessionUser?.lastName);
  const [email, setEmail] = useState(sessionUser?.email);
  const [username, setUsername] = useState(sessionUser?.username);
  const [profileImage, setProfileImage] = useState(sessionUser?.profileImage);
  // const [password, setPassword] = useState("");

  const handelUserEditForm = (e) => {
    dispatch(
      editUser({
        id: +sessionUser?.id,
        firstName,
        lastName,
        email,
        username,
        profileImage: profileImage || defaultImage,
        // password,
      })
    ).then(() => {
      setShowModal(false);
    });
  };

  const handleImageUpload = e => {
    e.preventDefault()
    setProfileImage(e.target.files[0])
  }

  const handleCancelButton = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <div id="edit-user-form-container">
        <div id="edit-user-form-text">Edit Profile</div>
        <form onSubmit={handelUserEditForm} id="edit-user-form">
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {/* <label>
        Password
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label> */}
          <label>
            Profile Image
            <input
              type="file"
              // value={profileImage}
              onChange={(e) => handleImageUpload(e)}
            />
          </label>
          <div id="edit-user-form-buttons">
            <button id="eufb-save" type="submit">
              Save
            </button>
            <button onClick={handleCancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUserForm;

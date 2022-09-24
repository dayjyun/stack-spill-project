import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/usersReducer";
import "./EditUser.css";

function EditUserForm({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState(sessionUser?.firstName);
  const [lastName, setLastName] = useState(sessionUser?.lastName);
  const [email, setEmail] = useState(sessionUser?.email);
  const [username, setUsername] = useState(sessionUser?.username);
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");

  const handelUserEditForm = (e) => {
    e.preventDefault()

    dispatch(
      editUser({
        userId: sessionUser?.id,
        firstName,
        lastName,
        email,
        username,
        profileImage,
        password,
      })
    ).then(() => {
      setShowModal(false)
    })
  };

  const handleCancelButton = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <form onSubmit={handelUserEditForm} id="edit-user-form">
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          // placeholder
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          // placeholder
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type="text"
          value={email}
          // placeholder
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          // placeholder
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="text"
          value={password}
          // placeholder
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Profile Image
        <input
          type="text"
          value={profileImage}
          // placeholder
          onChange={(e) => setProfileImage(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button onClick={handleCancelButton}>Cancel</button>
    </form>
  );
}

export default EditUserForm;

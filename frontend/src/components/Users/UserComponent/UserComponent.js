import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getUser } from "../../../store/usersReducer";
import "./UserComponent.css";

function UserComponent() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const allUsers = Object.values(useSelector((state) => state.users));
  const user = allUsers.filter((user) => user.id == userId)[0];
  console.log("sessionUser",sessionUser.id)

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  let editButton

    if (sessionUser.id == user.id) {
      editButton = <button>Edit Profile</button>
    }


  return (
    <>
      <div id="user-component-info">
        <img id="user-component-image" src={user?.profileImage} />
        <div id="user-component-details">
          <h1>{user?.username}</h1>
          <h3>{user?.firstName} {user?.lastName}</h3>
        </div>
        {editButton}
      </div>
      <div id="user-component-navlinks">
        <NavLink to={`/users/${userId}/questions`}>Questions</NavLink>
        <NavLink to={`/users/${userId}/answers`}>Answers</NavLink>
      </div>
    </>
  );
}

export default UserComponent;

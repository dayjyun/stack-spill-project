import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../store/usersReducer";
import "./Users.css";

function Users() {
  const dispatch = useDispatch();
  const allUsers = Object.values(useSelector((state) => state.users));

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <h1 id="users-text">Users</h1>
      <div id="users-container">
        <ul id="users-list">
          {allUsers.map((user) => (
            <div key={user?.id} id="users-component-card">
              <Link to={`/users/${user?.id}`}>
                <img
                  id="users-component-profileImage"
                  alt="user"
                  src={user?.profileImage}
                />
                <div>{user?.username}</div>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Users;

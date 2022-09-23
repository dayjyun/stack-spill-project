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
      <h1>Users</h1>
      {/* Search Bar for Users */}
      <ul>
        {allUsers.map((user) => (
          <div key={user?.id}>
            <Link to={`/users/${user?.id}`}>{user?.username}</Link>
          </div>
        ))}
      </ul>
    </>
  );
}

export default Users;

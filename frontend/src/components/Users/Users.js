import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/usersReducer";
import "./Users.css";

function Users() {
  const dispatch = useDispatch();
  const allUsers = Object.values(useSelector((state) => state.users));
  console.log(allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {allUsers.map((user) => (
        <div key={user?.id}>
          <li>{user?.username}</li>
        </div>
      ))}
    </>
  );
}

export default Users;

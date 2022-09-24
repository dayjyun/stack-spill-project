import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import { getAllQuestions } from "../../../store/questionsReducer";
import { getUser } from "../../../store/usersReducer";
import "./UserComponent.css";

function UserComponent() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allUsers = Object.values(useSelector((state) => state.users));
  const user = allUsers.filter((user) => user.id == userId)[0];
  // const allQuestions = Object.values(useSelector((state) => state.questions));
  // const userQuestions = allQuestions.filter((questions) => questions.userId == userId);

  useEffect(() => {
    // dispatch(getAllQuestions());
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return (
    <>
      <h1>{user?.username}</h1>
      {/* {userQuestions.map((question) => (
        <div>
          <div>{question?.title}</div>
          <div>{question?.body}</div>
        </div>
      ))} */}
      <div id='user-component-navlinks'>
        <NavLink to={`/users/${userId}/questions`}>Questions</NavLink>
        <NavLink to={`/users/${userId}/answers`}>Answers</NavLink>
      </div>
    </>
  );
}

export default UserComponent;

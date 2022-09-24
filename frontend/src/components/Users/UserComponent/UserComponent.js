import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllQuestions } from "../../../store/questionsReducer";
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
      <Link to={`/users/${userId}/questions`}>Questions</Link>
      <Link to={`/users/${userId}/answers`}>Answers</Link>
    </>
  );
}

export default UserComponent;

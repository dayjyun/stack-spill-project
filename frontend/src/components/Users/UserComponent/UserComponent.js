import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllQuestions } from "../../../store/questionsReducer";
import { getUser } from "../../../store/usersReducer";
import "./UserComponent.css";

function UserComponent() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allUsers = Object.values(useSelector((state) => state.users));
  const user = allUsers.filter((user) => user.id == userId)[0];
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const userQuestions = allQuestions.filter((questions) => questions.userId == userId);
  console.log(userQuestions);

  useEffect(() => {
    dispatch(getAllQuestions());
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return (
    <>
      <h1>{user?.username}</h1>
      {userQuestions.map((question) => (
        <div>
          <div>{question?.title}</div>
          <div>{question?.body}</div>
        </div>
      ))}
    </>
  );
}

export default UserComponent;

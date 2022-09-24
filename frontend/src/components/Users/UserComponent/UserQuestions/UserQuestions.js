import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllQuestions } from "../../../../store/questionsReducer";
import "./UserQuestions.css";

function UserQuestions() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  // const allUsers = Object.values(useSelector(state => state.users))
  // const currUser = allUsers.filter(user => user.id == userId)[0]
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const userQuestions = allQuestions.filter(
    (questions) => questions.userId == userId
  );

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  return (
    <>
      <h3>User Questions</h3>
      <div id='user-questions-container'>
        {userQuestions.map((question) => (
          <NavLink
            key={question?.id}
            id="user-questions-card"
            to={{ pathname: `/questions/${question?.id}` }}
          >
            <div id="user-questions-title">{question?.title}</div>
            <div id="user-questions-body">{question?.body}</div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default UserQuestions;

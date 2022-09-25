import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllQuestions } from "../../../../store/questionsReducer";
import "./UserQuestions.css";

function UserQuestions() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const userQuestions = allQuestions.filter(
    (questions) => questions.userId == userId
  );

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  let numQuestion

  if (userQuestions.length == 1) {
    numQuestion = <h3>{userQuestions.length} Question</h3>;
  } else {
    numQuestion = <h3>{userQuestions.length} Questions</h3>;
  }

  return (
    <>
      {numQuestion}
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

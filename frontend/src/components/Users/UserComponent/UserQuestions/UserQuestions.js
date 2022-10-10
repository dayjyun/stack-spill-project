import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getUserQuestions } from "../../../../store/userQuestionsReducer";
import "./UserQuestions.css";

function UserQuestions() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allUsers = Object.values(useSelector(state => state.users))
  const userInfo = allUsers.find(user => user?.id === +userId)
  const allQuestions = Object.values(useSelector((state) => state?.questions));
  const userQuestions = allQuestions.filter((questions) => questions?.userId === +userId);

  useEffect(() => {
    dispatch(getUserQuestions(+userId));
  }, [dispatch]);

  let numQuestion;

  if (userQuestions?.length === 1) {
    numQuestion = (<h3 id="user-questions-num">{userQuestions?.length} Question</h3>);
  } else {
    numQuestion = (<h3 id="user-questions-num">{userQuestions?.length} Questions</h3>);
  }

  return (
    <>
      <div id="user-questions">
        <div id="user-questions-text">
          <h1>{userInfo?.username}'s Questions</h1>
        </div>
        {numQuestion}
        <div id="user-questions-container">
          {userQuestions?.map((question, i) => (
            <NavLink
              key={i}
              id="user-questions-card"
              to={{ pathname: `/questions/${question?.id}` }}
            >
              <h2 id="user-questions-title">{question?.title}</h2>
              <div id="user-questions-body">
                {question?.body.length > 70
                  ? question?.body
                      .split("")
                      .filter((text, i) => i < 90)
                      .join("") + "..."
                  : question?.body}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserQuestions;

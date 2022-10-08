import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllAnswers } from "../../../../store/answersReducer";
import { getUserAnswers } from "../../../../store/usersReducer";
import "./UserAnswers.css";

function UserAnswers() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allUsers = Object.values(useSelector(state => state.users))
  const userInfo = allUsers.find(user => user?.id === +userId)
  const allAnswers = Object.values(useSelector((state) => state?.answers));
  const userAnswers = allAnswers.filter((answer) => answer?.userId === +userId);
  const allQuestions = Object.values(useSelector((state) => state?.questions));

  useEffect(() => {
    dispatch(getAllAnswers());
    dispatch(getUserAnswers(+userId))
  }, [dispatch, userId]);

  let answeredQuestions = [];

  for (let i = 0; i < allQuestions?.length; i++) {
    let questions = allQuestions[i];
    for (let j = 0; j < userAnswers?.length; j++) {
      let answers = userAnswers[j];
      if (answers?.questionId === +questions?.id) {
        answeredQuestions.push(questions);
      }
    }
  }

  let numAnswer

  if (answeredQuestions.length === 1) {
    numAnswer = (<h3 id="user-answers-num">{answeredQuestions?.length} Answer</h3>);
  } else {
    numAnswer = (<h3 id="user-answers-num">{answeredQuestions?.length} Answers</h3>);
  }

  return (
    <>
      <div id="user-answers">
        <div id="user-answers-text">
          <h1>{userInfo?.username}'s' Answers</h1>
        </div>
        {numAnswer}
        <div id="user-answers-container">
          {answeredQuestions.map((question, i) => (
            <NavLink
              key={i}
              id="user-answers-card"
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

export default UserAnswers;

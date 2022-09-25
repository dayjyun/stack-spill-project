import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllAnswers } from "../../../../store/answersReducer";
import { getAllQuestions } from "../../../../store/questionsReducer";
import "./UserAnswers.css";

function UserAnswers() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const userAnswers = allAnswers.filter((answer) => answer?.userId == userId);
  const allQuestions = Object.values(useSelector((state) => state.questions));

  useEffect(() => {
    dispatch(getAllAnswers());
    dispatch(getAllQuestions());
  }, [dispatch]);

  let answeredQuestions = [];

  for (let i = 0; i < allQuestions.length; i++) {
    let questions = allQuestions[i];
    for (let j = 0; j < userAnswers.length; j++) {
      let answers = userAnswers[j];
      if (answers.questionId == questions.id) {
        answeredQuestions.push(questions);
      }
    }
  }

  let numAnswer

  if (answeredQuestions.length == 1) {
    numAnswer = <h3>{answeredQuestions.length} Answer</h3>
  } else {
    numAnswer = <h3>{answeredQuestions.length} Answers</h3>;
  }

  return (
    <>
      {numAnswer}
      {answeredQuestions.map((question) => (
        <NavLink
          key={question?.id}
          id="user-answers-card"
          to={{ pathname: `/questions/${question?.id}` }}
        >
          <div id='user-questions-title'>{question?.title}</div>
          <div id='user-questions-body'>{question?.body}</div>
        </NavLink>
      ))}
    </>
  );
}

export default UserAnswers;

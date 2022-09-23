import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllQuestions } from "../../store/questionsReducer";
import "./QuestionsPage.css";

function QuestionsPage() {
  const dispatch = useDispatch();
  const allQuestions = Object.values(useSelector((state) => state.questions));

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  return (
    <div id="questions-page-component">
      <h1>All Questions</h1>
      <div id="questions-container">
        {allQuestions.map((question) => (
          <NavLink
            key={question.id}
            id="question-card"
            to={{ pathname: `/questions/{question?.id}` }}
          >
            <div id="question-title">{question?.title}</div>
            <div id="question-body">{question?.body}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default QuestionsPage;

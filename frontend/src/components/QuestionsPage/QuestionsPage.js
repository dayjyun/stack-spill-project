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

  let allQuestionsNum

  if (allQuestions.length == 1) {
    allQuestionsNum = <h3>{allQuestions.length} Question</h3>
  } else {
    allQuestionsNum = <h3>{allQuestions.length} Questions</h3>
  }

  return (
    <div id="all-questions-page-component">
      <h1>All Questions</h1>
      {allQuestionsNum}
      <div id="all-questions-container">
        {allQuestions.map((question) => (
          <NavLink
            key={question?.id}
            id="all-questions-card"
            to={{ pathname: `/questions/${question?.id}` }}
          >
            <div id="all-questions-title">{question?.title}</div>
            <div id="all-questions-body">{question?.body}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default QuestionsPage;

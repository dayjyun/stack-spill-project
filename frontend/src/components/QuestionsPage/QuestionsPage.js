import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllQuestions } from "../../store/questionsReducer";
import CreateQuestionButton from "../CreateComponents/CreateQuestion/CreateQuestionButton";
import LoginTextModal from "../LoginFormModal/LoginTextModal";
import "./QuestionsPage.css";

function QuestionsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allQuestions = Object.values(useSelector((state) => state.questions));

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  let allQuestionsNum;
  allQuestions.length == 1
    ? (allQuestionsNum = (
        <h3 id="all-questions-num">{allQuestions.length} Question</h3>
      ))
    : (allQuestionsNum = (
        <h3 id="all-questions-num">{allQuestions.length} Questions</h3>
      ));

  let createQuestionButton;
  if (sessionUser) {
    createQuestionButton = <CreateQuestionButton />;
  } else {
    createQuestionButton = (
      <div id="create-question-login-button">
        <LoginTextModal />
        <div id="cqlb-text">to ask a Question</div>
      </div>
    );
  }

  return (
    <>
      <div id="questions-page-container">
        <div id="all-questions-text">
          <h1>All Questions</h1>
          {createQuestionButton}
        </div>
        {allQuestionsNum}
        <div id="all-questions-container">
          {allQuestions.map((question) => (
            <NavLink
              key={question?.id}
              id="all-questions-card"
              to={{ pathname: `/questions/${question?.id}` }}
            >
              <h2 id="all-questions-title">{question?.title}</h2>
              <div id="all-questions-body">{question?.body.length > 70 ? question?.body.split('').filter((text, i) => i < 70).join('') + '...' : question?.body}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default QuestionsPage;

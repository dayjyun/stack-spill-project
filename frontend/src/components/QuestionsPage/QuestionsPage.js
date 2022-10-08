import { useEffect, useState } from "react";
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
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    dispatch(getAllQuestions(sortType));
  }, [dispatch, sortType, allQuestions.length]);

  let allQuestionsNum;
  allQuestions.length === 1
    ? (allQuestionsNum = (
        <h3 id="all-questions-num">{allQuestions?.length} Question</h3>
      ))
    : (allQuestionsNum = (
        <h3 id="all-questions-num">{allQuestions?.length} Questions</h3>
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
        <div id="all-questions-num-sort">
          {allQuestionsNum}
          <div id='questions-page-select-dropdown'>
            <select onChange={(e) => setSortType(e.target.value)}>
              <option disabled value="sort">Sort</option>
              <option value="createdAt">Most Recent</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>
        <div id="all-questions-container">
          {allQuestions.map((question, i) => (
            <NavLink
              key={i}
              id="all-questions-card"
              to={{ pathname: `/questions/${question?.id}` }}
            >
              <h2 id="all-questions-title">{question?.title}</h2>
              <div id="all-questions-body">
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

export default QuestionsPage;

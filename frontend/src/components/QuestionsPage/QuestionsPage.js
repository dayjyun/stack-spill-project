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

  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("questions");

  useEffect(() => {
    dispatch(getAllQuestions());

    const sortArray = (type) => {
      const types = {
        title: "title",
        createdAt: "createdAt",
      };
      const sortProperty = types[type];
      const sorted = [...allQuestions]?.sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setData(sorted);
    };

    sortArray(sortType);
  }, [dispatch, sortType, allQuestions.length]);

  console.log(allQuestions)
  console.log({data})

  // useEffect(() => {
  //   const sortArray = (type) => {
  //     const types = {
  //       title: "title",
  //       createdAt: "createdAt",
  //     };
  //     const sortProperty = types[type];
  //     const sorted = [...allQuestions]?.sort(
  //       (a, b) => b[sortProperty] - a[sortProperty]
  //     );
  //     setData(sorted);
  //   };

  //   sortArray(sortType);
  // }, [sortType]);

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

        <div id="questions-page-sort">
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="title">title</option>
            <option value="createdAt">createdAt</option>
          </select>

          {data.map((question) => (
            <NavLink
              key={question?.id}
              id="all-questions-card"
              to={{ pathname: `/questions/${question?.id}` }}
            >
              <h2 id="all-questions-title">{question?.title}</h2>
              <div id="all-questions-body">
                {question?.body.length > 70
                  ? question?.body
                      .split("")
                      .filter((text, i) => i < 70)
                      .join("") + "..."
                  : question?.body}
              </div>
            </NavLink>
          ))}
        </div>
        {/* <button onClick={byName}>Sort By Name</button> // ! Make button work? */}
        {/* <div id="all-questions-container">
          {allQuestions.map((question) => (
            <NavLink
              key={question?.id}
              id="all-questions-card"
              to={{ pathname: `/questions/${question?.id}` }}
            >
              <h2 id="all-questions-title">{question?.title}</h2>
              <div id="all-questions-body">
                {question?.body.length > 70
                  ? question?.body
                      .split("")
                      .filter((text, i) => i < 70)
                      .join("") + "..."
                  : question?.body}
              </div>
            </NavLink>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default QuestionsPage;

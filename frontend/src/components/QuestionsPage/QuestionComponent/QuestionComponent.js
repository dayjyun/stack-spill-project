import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../../store/questionsReducer";
import { getAllAnswers } from "../../../store/answersReducer";
import "./QuestionComponent.css";
import AnswersComponent from "../AnswersComponent/Answers";
import { getUser } from "../../../store/usersReducer";

function QuestionComponent() {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.filter((question) => question.id == questionId)[0];
  const allUsers = Object.values(useSelector(state => state.users))
  const user = allUsers.filter(user => user.id == question.userId)[0]
  console.log("username:", user.username)
  console.log("question.userId:", question.userId)

  useEffect(() => {
    // dispatch(getUser(userId))
    dispatch(getQuestion(questionId));
  }, [dispatch]);

  return (
    <>
      <div id='question-card'>
        <h1 id="question-title">{question?.title}</h1>
        <h3 id="question-body">{question?.body}</h3>
        <h3>By {user?.username}</h3>
      </div>
      <div >
        <AnswersComponent questionId={questionId}/>
      </div>
    </>
  );
}

export default QuestionComponent;

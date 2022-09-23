import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuestion } from "../../../store/questionsReducer";
import { getUser } from "../../../store/usersReducer";
import AnswersComponent from "../AnswersComponent/Answers";
import "./QuestionComponent.css";

function QuestionComponent() {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.filter((question) => question.id == questionId)[0];
  const allUsers = Object.values(useSelector(state => state.users))
  const userQuestion = allUsers.filter(user => user.id == question?.userId)[0]

  useEffect(() => {
    dispatch(getQuestion(questionId));
  }, [dispatch]);

  return (
    <>
      <div key={question?.id} id="question-card">
        <h1 id="question-title">{question?.title}</h1>
        <h3 id="question-body">{question?.body}</h3>
        By <Link to={`/users/${userQuestion?.id}`}>{userQuestion?.username}</Link>
      </div>
      <div>
        <AnswersComponent questionId={questionId} allUsers={allUsers}/>
      </div>
    </>
  );
}

export default QuestionComponent;

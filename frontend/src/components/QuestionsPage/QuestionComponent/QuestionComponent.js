import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../../store/questionsReducer";
import { getAllAnswers } from "../../../store/answersReducer";
import "./QuestionComponent.css";
import AnswersComponent from "../AnswersComponent/Answers";

function QuestionComponent() {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.filter((question) => question.id == questionId)[0];

  useEffect(() => {
    dispatch(getQuestion(questionId));
  }, [dispatch]);

  return (
    <>
      <div>
        <h1 id="question-title">{question?.title}</h1>
        <h3 id="question-body">{question?.body}</h3>
      </div>
      <div >
        <AnswersComponent questionId={questionId}/>
      </div>
    </>
  );
}

export default QuestionComponent;

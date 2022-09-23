import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../../store/questionsReducer";
import "./Question.css";

function Question() {
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
        <p id="question-body">{question?.body}</p>
      </div>
    </>
  );
}

export default Question;

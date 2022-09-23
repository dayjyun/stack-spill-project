import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      {allQuestions.map((question) => (
        <div key={question.id} id='question-card'>
          <div id='question-title'>{question.title}</div>
          <div id='question-body'>{question.body}</div>
        </div>
      ))}
    </div>
  );
}

export default QuestionsPage;

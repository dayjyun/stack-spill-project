import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editQuestion } from "../../store/questionsReducer";
import "./EditQuestionForm.css";

function EditQuestionForm({ setShowModal, questionId }) {
  const dispatch = useDispatch();
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.filter((question) => question.id == questionId)[0];
  const [title, setTitle] = useState(question?.title);
  const [body, setBody] = useState(question?.body);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editQuestion({
        id: questionId,
        title,
        body,
      })
    ).then(() => {
      setShowModal(false);
    });
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <form onSubmit={handleQuestionSubmit} id='edit-question-form'>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Body
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button onClick={handleCancelButton}>Cancel</button>
    </form>
  );
}

export default EditQuestionForm;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer, editAnswer } from "../../store/answersReducer";
import "./EditAnswerForm.css";

function EditAnswerForm({ setShowModal, answerId, questionId }) {
  const dispatch = useDispatch();
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const answer = allAnswers.filter((answer) => answer?.id == answerId)[0];
  const [body, setBody] = useState(answer?.body);

  const handleAnswerEdit = (e) => {
    e.preventDefault();

    dispatch(
      editAnswer({
        id: answer?.id,
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

  const handleDeleteButton = e => {
    e.preventDefault()
    setShowModal(false)
    dispatch(deleteAnswer(+answerId))
    alert("Answer deleted")
  }

  return (
    <form onSubmit={handleAnswerEdit} id="edit-answer-form">
      <label>
        Body
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <div id="edit-answer-buttons">
        <button type="submit">Save</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </div>
      <div>
        <button onClick={handleDeleteButton} id='edit-answer-delete'>Delete</button>
      </div>
    </form>
  );
}

export default EditAnswerForm;

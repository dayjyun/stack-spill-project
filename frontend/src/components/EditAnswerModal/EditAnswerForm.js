import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAnswer } from "../../store/answersReducer";
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

  return (
    <form onSubmit={handleAnswerEdit} id='edit-answer-form'>
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

export default EditAnswerForm;

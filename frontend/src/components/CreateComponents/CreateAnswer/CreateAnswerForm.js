import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnswer } from "../../../store/answersReducer";

function CreateAnswerForm({ questionId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createAnswer({
        questionId,
        body,
      })
    ).then(() => {
      e.preventDefault();
    });
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleAnswerSubmit}>
      <label>
        Your Answer
        <input
          type={"text"}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
      <button onClick={handleCancelButton}>Cancel</button>
    </form>
  );
}

export default CreateAnswerForm;

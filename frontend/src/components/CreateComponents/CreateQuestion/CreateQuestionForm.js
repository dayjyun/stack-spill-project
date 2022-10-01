import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createQuestion } from "../../../store/questionsReducer";
import "./CreateQuestionForm.css";

function CreateQuestionForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const wordCaps = (str) => {
    let strArr = str.split(' ').map(word => {
      let cap = word.slice(0, 1).toUpperCase();
      let rest = word.slice(1);
      return `${cap}${rest}`;
    })
    return strArr.join(' ')
  }

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    await dispatch(
      createQuestion({
        title: wordCaps(title),
        body,
      })
    ).then(() => {
      history.push(`/users/${sessionUser?.id}`);
    });

    setTitle("");
    setBody("");
  };

  const handleCancelButton = () => {
    history.push("/");
  };

  return (
    <form onSubmit={handleCreateQuestion}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Body
        <input
          type="text"
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

export default CreateQuestionForm;

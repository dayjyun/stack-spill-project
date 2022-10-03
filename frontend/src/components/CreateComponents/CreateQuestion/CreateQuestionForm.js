import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createQuestion } from "../../../store/questionsReducer";
import "./CreateQuestionForm.css";

function CreateQuestionForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const wordCaps = (str) => {
    let strArr = str.split(" ").map((word) => {
      let cap = word.slice(0, 1).toUpperCase();
      let rest = word.slice(1);
      return `${cap}${rest}`;
    });
    return strArr.join(" ");
  };

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
    <>
      <div id="create-question-form-text">
        <div className="cqft-header">Have A Question?</div>
        <p id="cqft-top-text">
          Asking a good question can sometimes be challenging. It may be tricky
          to get your point across or you may leave out information that may
          help solve your solution. So how would you write a great question?
        </p>
        <p id="cqft-top-text">
          A great question isn’t always created in an instant. A great question
          takes time and critical thinking in order to get your point across.
        </p>
        <ul>
          <p className="cqft-header">
            A great question consists of a few things
          </p>
          <ol>It has to be specific</ol>
          <ol>It has to be clear and concise</ol>
          <ol>
            And, it has to demonstrate that you put effort into writing it out
          </ol>
        </ul>
        <ul>
          <p className="cqft-header">Asking A Great Question</p>
          <ol>
            1. Write down everything that you understand about the problem
          </ol>
          <ol>
            2. Write down everything that you don’t understand about the problem
          </ol>
          <ol>
            3. Once you complete both segments, write down your specific
            question
          </ol>
          <ol>
            4. Lastly, clean up the question by eliminating unnecessary words
          </ol>
        </ul>
        <p className="cqft-header">Happy Asking!</p>
      </div>
      <form onSubmit={handleCreateQuestion} id="create-question-form">
        <label className="create-question-form-label">
          Title
          <input
            type="text"
            className="create-question-form-input cqfi-title"
            value={title}
            placeholder='How about a good attention grabber?'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="create-question-form-label">
          Body
          <input
            type="text"
            className="create-question-form-input cqfi-body"
            value={body}
            placeholder='This is where the story gets interesting...'
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button onClick={handleCancelButton}>Cancel</button>
      </form>
    </>
  );
}

export default CreateQuestionForm;

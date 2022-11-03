import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnswer } from "../../../store/answersReducer";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./CreateAnswerForm.css";

function CreateAnswerForm({ questionId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createAnswer({
        questionId: +questionId,
        body,
      })
    ).then(() => {
      e.preventDefault();
    });
    setBody("");
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    setBody("");
  };

  return (
    <>
      <div id="create-answer-form-container">
        <form onSubmit={handleAnswerSubmit} id="create-answer-form">
          <h3>
            Your Answer
            {/* <textarea
              className="create-answer-form-input"
              type={"text"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            /> */}
          </h3>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onChange={(e, editor) => {
                setBody(editor.getData());
              }}
            />
          </div>
          <div id="create-answer-form-buttons">
            <button id="cafb-save" type="submit">
              Submit
            </button>
            <button id="cafb-cancel" onClick={handleCancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAnswerForm;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer, editAnswer } from "../../../store/answersReducer";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./EditAnswerForm.css";

function EditAnswerForm({ setShowModal, answerId }) {
  const dispatch = useDispatch();
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const answer = allAnswers.filter((answer) => answer?.id === +answerId)[0];
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

  const handleDeleteButton = (e) => {
    e.preventDefault();
    setShowModal(false);
    dispatch(deleteAnswer(+answerId));
  };

  return (
    <>
      <h2 id="edit-answer-form-text">Edit Your Answer</h2>
      <form onSubmit={handleAnswerEdit} id="edit-answer-form">
        <label className="edit-answer-form-label">
          {/* Body */}
          {/* <textarea
            type="text"
            className="edit-answer-form-input eafi-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          /> */}
          <div>
            <CKEditor
              className='eaf-text-editor'
              editor={ClassicEditor}
              data={body}
              onChange={(event, editor) => {
                setBody(editor.getData());
              }}
            />
          </div>
        </label>
        <div id="edit-answer-buttons">
          <button id="eab-save" type="submit">
            Save
          </button>
          <button id="eab-cancel" onClick={handleCancelButton}>
            Cancel
          </button>
        </div>
        <div>
          <button onClick={handleDeleteButton} id="eab-delete">
            Delete
          </button>
        </div>
      </form>
    </>
  );
}

export default EditAnswerForm;

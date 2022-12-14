import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteQuestion, editQuestion } from "../../../store/questionsReducer";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./EditQuestionForm.css";

function EditQuestionForm({ setShowModal, questionId }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.filter((question) => question.id == questionId)[0];
  const [title, setTitle] = useState(question?.title);
  const [body, setBody] = useState(question?.body);

  const wordCaps = (str) => {
    let strArr = str.split(' ').map(word => {
      let cap = word.slice(0, 1).toUpperCase()
      let rest =  word.slice(1)
      return `${cap}${rest}`
    })
    return strArr.join(' ')
  }

  const handelQuestionEdit = (e) => {
    e.preventDefault();

    dispatch(
      editQuestion({
        id: questionId,
        title: wordCaps(title),
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
    dispatch(deleteQuestion(+questionId));
    history.push('/')
  };

  return (
    <>
      <h2 id="edit-question-form-text">Edit Your Question</h2>
      <form onSubmit={handelQuestionEdit} id="edit-question-form">
        <label className="edit-question-form-label">
          Title
          <input
            type="text"
            className="edit-question-form-input eqfi-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="edit-question-form-label">
          Body
          {/* <textarea
            type="text"
            className="edit-question-form-input eqfi-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          /> */}
          <div>
            <CKEditor
              className="eaf-text-editor"
              editor={ClassicEditor}
              data={body}
              onChange={(event, editor) => {
                setBody(editor.getData());
              }}
            />
          </div>
        </label>
        <div id="edit-question-buttons">
          <button id="eqb-save" type="submit">
            Save
          </button>
          <button id="eqb-cancel" onClick={handleCancelButton}>
            Cancel
          </button>
        </div>
        <div>
          <button onClick={handleDeleteButton} id="eqb-delete">
            Delete
          </button>
        </div>
      </form>
    </>
  );
}

export default EditQuestionForm;

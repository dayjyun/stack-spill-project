import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditQuestionForm from "./EditQuestionForm";
import './EditQuestionModal.css'

function EditQuestionModal({ questionId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-question-modal-button" onClick={() => setShowModal(true)}>
        <img
          id="edit-question-button-image"
          src={
            "https://stack-spill-project.s3.us-east-2.amazonaws.com/icons8-settings.gif"
          }
        />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditQuestionForm
            setShowModal={setShowModal}
            questionId={questionId}
          />
        </Modal>
      )}
    </>
  );
}

export default EditQuestionModal;

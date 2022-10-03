import { useState } from "react"
import { Modal } from "../../../context/Modal"
import EditAnswerForm from "./EditAnswerForm"
import './EditAnswerModal.css'

function EditAnswerModal({ answerId, questionId }) {
    const [showModal, setShowModal] = useState(false)

    return (
      <>
        <button id="edit-answer-modal-button" onClick={() => setShowModal(true)}>
          <img
            id="edit-answer-button-image"
            src={
              "https://stack-spill-project.s3.us-east-2.amazonaws.com/icons8-settings.gif"
            }
          />
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditAnswerForm
              setShowModal={setShowModal}
              answerId={answerId}
              questionId={questionId}
            />
          </Modal>
        )}
      </>
    );
}

export default EditAnswerModal

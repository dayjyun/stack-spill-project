import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditQuestionForm from "./EditQuestionForm";

function EditQuestionModal({ questionId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditQuestionForm setShowModal={setShowModal} questionId={questionId}/>
        </Modal>
      )}
    </>
  );
}

export default EditQuestionModal;

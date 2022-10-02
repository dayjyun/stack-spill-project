import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditUserForm from "./EditUserForm";
import "./EditUserModal.css";

function EditUserModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-user-modal-button" onClick={() => setShowModal(true)}>
        <img
          id="edit-user-button-image"
          src={
            "https://stack-spill-project.s3.us-east-2.amazonaws.com/icons8-settings.gif"
          }
        />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUserForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditUserModal;

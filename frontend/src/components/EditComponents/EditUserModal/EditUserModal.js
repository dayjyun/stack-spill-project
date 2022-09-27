import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditUserForm from "./EditUserForm";

function EditUserModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUserForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditUserModal;

import React, { useState } from "react";
import { LoginTextModal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginFormModal.css";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="login-form-text-modal-button" onClick={() => setShowModal(true)}>
        Log In
      </button>
      {showModal && (
        <LoginTextModal onClose={() => setShowModal(false)}>
          <LoginForm />
        </LoginTextModal>
      )}
    </>
  );
}

export default LoginFormModal;


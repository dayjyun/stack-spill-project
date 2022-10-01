import { useState } from "react"
import { Modal } from "../../../context/Modal"
import EditAnswerForm from "./EditAnswerForm"
import './EditAnswerModal.css'

function EditAnswerModal({ answerId, questionId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button id='edit-answer-modal-button' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditAnswerForm setShowModal={setShowModal} answerId={answerId} questionId={questionId}/>
                </Modal>
            )}
        </>
    )
}

export default EditAnswerModal

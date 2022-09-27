import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteAnswerVote, editAnswerVote, getAllVotes } from "../../../store/votesReducer"

function EditAnswerVote({ answerId }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const allVotes = Object.values(useSelector(state => state.votes))
    const answerVotes = allVotes.filter(vote => vote?.answerId == answerId)
    const userVote = answerVotes.find(vote => vote?.userId == sessionUser?.id)
    const [vote, setVote] = useState(userVote?.vote)

    // console.log({userVote})

    useEffect(() => {
        dispatch(getAllVotes())
    }, [dispatch])

    const handleUpArrow = e => {
        e.preventDefault()

        dispatch(editAnswerVote({
            userId: sessionUser?.id,
            vote: true,
            answerId: userVote?.answerId
        }))
    }

    const handleDownArrow = e => {
        e.preventDefault()
        dispatch(editAnswerVote({
            userId: sessionUser?.id,
            vote: false,
            answerId: userVote?.answerId
        }))
    }

    const deleteCurrentAnswerVote = (e) => {
        e.preventDefault();
        dispatch(deleteAnswerVote(userVote?.answerId))
    }

    return (
      <>
        <button onClick={handleUpArrow}>UP</button>
        <button onClick={handleDownArrow}>DOWN</button>
        {/* <button onClick={deleteCurrentAnswerVote}>Delete Vote</button> */}
      </>
    );
}

export default EditAnswerVote

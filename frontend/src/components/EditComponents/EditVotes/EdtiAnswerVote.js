import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAnswerVote, deleteAnswerVote, editAnswerVote, getAllVotes } from "../../../store/votesReducer"

function EditAnswerVote({ answerId }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const allVotes = Object.values(useSelector(state => state.votes))
    const answerVotes = allVotes.filter(vote => vote?.answerId == answerId)
    const userVote = answerVotes.find(vote => vote?.userId == sessionUser?.id)
    const [upVote, setUpVote] = useState(false)
    const [downVote, setDownVote] = useState(false)

    useEffect(() => {
        // dispatch(getAllVotes())
        const sessionUserAnswerVote = () => {
            setUpVote(answerVotes?.includes(userVote?.vote))
        }
        sessionUserAnswerVote()
    }, [dispatch])

    const upVoteAnswer = async () => {
        if (userVote?.vote === true) {
            await dispatch(deleteAnswerVote(answerId))
        } else {
            await dispatch(createAnswerVote({
                userId: userVote?.userId,
                vote: true,
                answerId,
            }))
        }
    }

    const downVoteAnswer = async () => {
        if (userVote?.vote === false) {
            await dispatch(deleteAnswerVote(answerId))
        } else {
            await dispatch(createAnswerVote({
                userId: userVote?.userId,
                vote: downVote,
                answerId,
            }))
        }
    }

    const handleUpVote = async () => {
        await upVoteAnswer()
            .then(async () => setUpVote(!upVote))
    }

    const handleDownVote = async () => {
        await downVoteAnswer()
            .then(async () => setDownVote(!downVote))
    }

    return (
      <>
        <button onClick={handleUpVote}>UP</button>
        <button onClick={handleDownVote}>DOWN</button>
      </>
    );
}

export default EditAnswerVote

    // const handleUpArrow = e => {
    //     e.preventDefault()

    //     dispatch(editAnswerVote({
    //         userId: sessionUser?.id,
    //         vote: true,
    //         answerId: userVote?.answerId
    //     }))
    // }

    // const handleDownArrow = e => {
    //     e.preventDefault()
    //     dispatch(editAnswerVote({
    //         userId: sessionUser?.id,
    //         vote: false,
    //         answerId: userVote?.answerId
    //     }))
    // }

    // const deleteCurrentAnswerVote = (e) => {
    //     e.preventDefault();
    //     dispatch(deleteAnswerVote(userVote?.answerId))
    // }

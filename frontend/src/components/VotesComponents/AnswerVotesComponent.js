import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVotes } from '../../store/votesReducer';
import './AnswerVotesComponent.css'

function AnswerVotesComponent({ answerId }) {
    const dispatch = useDispatch()
    const allVotes = Object.values(useSelector(state => state.votes))
    const answerVotes = allVotes.filter(vote => vote?.answerId == answerId)

    useEffect(() => {
        dispatch(getAllVotes())
    }, [dispatch])

    console.log(answerVotes)

    let voteCount = 0;

    answerVotes.map(vote => {
        // if (vote?.vote === true) {
        //     voteCount += 1
        // } else if (vote?.vote === false) {
        //     voteCount -= 1
        // }

        vote?.vote === true ? voteCount += 1 : voteCount -= 1
    })

    return (
      <>
        <button>UP</button> {/* EditAnswerVote */}
        <button>DOWN</button> {/* EditAnswerVote */}
        <h1>{voteCount} Votes</h1>
      </>
    );
}

export default AnswerVotesComponent;

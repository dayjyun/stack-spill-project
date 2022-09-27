import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVotes } from '../../store/votesReducer';
import EditAnswerVote from '../EditComponents/EditVotes/EdtiAnswerVote';
import './AnswerVotesComponent.css'

function AnswerVotesComponent({ answerId }) {
    const dispatch = useDispatch()
    const allVotes = Object.values(useSelector(state => state.votes))
    const answerVotes = allVotes.filter(vote => vote?.answerId == answerId)

    useEffect(() => {
        dispatch(getAllVotes())
    }, [dispatch])

    let answerVoteCount = 0;

    answerVotes.map(vote => {
        vote?.vote === true ? answerVoteCount += 1 : answerVoteCount -= 1
    })

    return (
      <>
        <EditAnswerVote answerId={answerId}/>
        <h2>{answerVoteCount} Votes</h2>
      </>
    );
}

export default AnswerVotesComponent;

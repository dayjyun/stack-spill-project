import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVotes } from "../../store/votesReducer";
import EditQuestionVote from "../EditComponents/EditVotes/EditQuestionVote";
import "./QuestionVotesComponent.css";

function QuestionVotesComponent({ questionId }) {
  const dispatch = useDispatch();
  const allVotes = Object.values(useSelector((state) => state.votes));
  const questionVotes = allVotes.filter((vote) => vote?.questionId == questionId);

  useEffect(() => {
    dispatch(getAllVotes());
  }, [dispatch]);


  let voteCount = 0;
//   let trueVotes = []
//   let falseVotes = []
//   let trueVotes = {}
//   let falseVotes = {}

  questionVotes.map((vote) => {
    vote?.vote === true ? voteCount += 1 : voteCount -= 1
  });

  return (
    <>
      <EditQuestionVote questionId={questionId}/>
      <h1>{voteCount} Votes</h1>
    </>
  );
}

export default QuestionVotesComponent;

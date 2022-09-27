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


  let questionVoteCount = 0;
//   let trueVotes = []
//   let falseVotes = []
//   let trueVotes = {}
//   let falseVotes = {}

  questionVotes.map((vote) => {
    vote?.vote === true ? questionVoteCount += 1 : questionVoteCount -= 1
  });

  return (
    <>
      <EditQuestionVote questionId={questionId} />
      <h2>{questionVoteCount} Votes</h2>
    </>
  );
}

export default QuestionVotesComponent;

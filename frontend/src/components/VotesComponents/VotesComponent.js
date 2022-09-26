import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVotes } from "../../store/votesReducer";
import "./VotesComponent.css";

function VotesComponent({ questionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allVotes = Object.values(useSelector((state) => state.votes));
  const questionVote = allVotes.find(vote => vote?.questionId == questionId)
  console.log(questionVote);

  useEffect(() => {
    dispatch(getAllVotes());
  }, [dispatch]);

  return (
    <>
      <h1>Votes</h1>
    </>
  );
}

export default VotesComponent;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editQuestionVote, getAllVotes } from "../../../store/votesReducer";

function EditQuestionVote({ questionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allVotes = Object.values(useSelector((state) => state.votes));
  const questionVotes = allVotes.filter((vote) => vote?.questionId == questionId);
  const userVote = questionVotes.find((vote) => vote?.userId == sessionUser?.id);
  const [vote, setVote] = useState(userVote?.vote);

  useEffect(() => {
    dispatch(getAllVotes());
  }, [dispatch]);

  const handleUpArrow = (e) => {
    e.preventDefault();

    dispatch(
      editQuestionVote({
        userId: sessionUser?.id,
        vote: true,
        questionId: userVote?.questionId,
      })
    );
    // vote === false ? setVote(true) : setVote('')
  };

  const handleDownArrow = (e) => {
    e.preventDefault();
    dispatch(
      editQuestionVote({
        userId: sessionUser?.id,
        vote: false,
        questionId: userVote?.questionId,
      })
    );
    //   vote === true ? setVote(false) : setVote("");
  };

  const handleVoteClick = (e) => {
    e.preventDefault();
    // vote === true ? setVote(false) : setVote(true)
  };

  const deleteVote = (e) => {
    e.preventDefault();
    // how to delete active vote?
  };

  return (
    <>
      <button onClick={handleUpArrow}>UP</button>
      <button onClick={handleDownArrow}>DOWN</button>
    </>
  );
}

export default EditQuestionVote;

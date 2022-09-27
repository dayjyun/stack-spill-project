import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestionVote,
  deleteQuestionVote,
  editQuestionVote,
  getAllVotes,
  getQuestionVote,
} from "../../../store/votesReducer";
import CreateQuestionVote from "../../CreateComponents/CreateVote/CreateQuestionVote";
import './EditVote.css'

function EditQuestionVote({ questionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allVotes = Object.values(useSelector((state) => state.votes));
  const questionVotes = allVotes.filter((vote) => vote?.questionId == questionId);
  const userVote = questionVotes.find((vote) => vote?.userId == sessionUser?.id);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false)

  useEffect(() => {
    dispatch(getAllVotes());
    dispatch(getQuestionVote(questionId))
    const sessionUserQuestionVote = () => {
      setUpVote(questionVotes?.includes(userVote?.vote));
    };
    sessionUserQuestionVote();
  }, [dispatch]);

  const upVoteQuestion = async () => {
    if (userVote?.vote) {
      console.log("0 ---------")
      await dispatch(deleteQuestionVote(questionId));
    } else {
      console.log('1 ---------')
      await dispatch(createQuestionVote({
        userId: userVote?.userId,
        vote: true,
        questionId,
      }));
    }
  };

  const downVoteQuestion = async () => {
    if (userVote?.vote) {
      await dispatch(deleteQuestionVote(questionId));
    } else {
      await dispatch(createQuestionVote({
        userId: userVote?.userId,
        vote: downVote,
        questionId,
      }));
    }
  };

  const handleUpVote = async () => {
    await upVoteQuestion()
      .then(async () => setUpVote(!upVote))
  }

  const handleDownVote = async () => {
    await downVoteQuestion()
      .then(async () => setDownVote(!downVote))
  }

  return (
    <>
      <button id='edit-questionv-vote-up' onClick={handleUpVote}>UP</button>
      <button id='edit-question-vote-down' onClick={handleDownVote}>DOWN</button>
    </>
  );
}
export default EditQuestionVote;

  // const handleUpArrow = (e) => {
  //   e.preventDefault();

  //   dispatch(
  //     editQuestionVote({
  //       userId: sessionUser?.id,
  //       vote: true,
  //       questionId: userVote?.questionId,
  //     })
  //   );
  //   // vote === false ? setVote(true) : setVote('')
  // };

  // const handleDownArrow = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     editQuestionVote({
  //       userId: sessionUser?.id,
  //       vote: false,
  //       questionId: userVote?.questionId,
  //     })
  //   );
  //   //   vote === true ? setVote(false) : setVote("");
  // };

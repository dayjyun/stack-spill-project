import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestionVote,
  deleteQuestionVote,
  getAllVotes,
  getQuestionVote,
} from "../../../store/votesReducer";
import "./EditQuestionVote.css";

function EditQuestionVote({ questionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allVotes = Object.values(useSelector((state) => state.votes));
  const questionVotes = allVotes.filter(
    (vote) => vote?.questionId == questionId
  );
  const userVote = questionVotes.find(
    (vote) => vote?.userId == sessionUser?.id
  );
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  useEffect(() => {
    dispatch(getAllVotes());
    dispatch(getQuestionVote(questionId));
    const sessionUserQuestionVote = () => {
      setUpVote(questionVotes?.includes(userVote?.vote));
    };
    sessionUserQuestionVote();
  }, [dispatch]);

  const upVoteQuestion = async () => {
    if (userVote?.vote === true) {
      await dispatch(deleteQuestionVote(+questionId));
      // doesn't update state
    } else {
      await dispatch(
        createQuestionVote({
          userId: userVote?.userId,
          vote: true,
          questionId: +questionId,
        })
      );
    }
  };

  const downVoteQuestion = async () => {
    if (userVote?.vote === false) {
      await dispatch(deleteQuestionVote(questionId));
    } else {
      await dispatch(
        createQuestionVote({
          userId: userVote?.userId,
          vote: downVote,
          questionId,
        })
      );
    }
  };

  let questionVoteCount = 0;

  questionVotes.map((vote) => {
    vote?.vote === true ? (questionVoteCount += 1) : (questionVoteCount -= 1);
  });

  const handleUpVote = async () => {
    await upVoteQuestion().then(async () => setUpVote(!upVote));
  };

  const handleDownVote = async () => {
    await downVoteQuestion().then(async () => setDownVote(!downVote));
  };

  return (
    <>
      <div id="edit-question-votes">
        <button id="edit-question-vote-up" onClick={handleUpVote}>
          <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
        </button>
        <div id='edit-question-vote-count'>{questionVoteCount}</div>
        <button id="edit-question-vote-down" onClick={handleDownVote}>
          <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
        </button>
      </div>
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnswerVote,
  deleteAnswerVote,
  editAnswerVote,
} from "../../../store/votesReducer";
import "./EditAnswerVote.css";

function EditAnswerVote({ answerId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allVotes = Object.values(useSelector((state) => state.votes));
  const answerVotes = allVotes.filter((vote) => vote?.answerId == answerId);
  const userVote = answerVotes.find((vote) => vote?.userId == sessionUser?.id);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  useEffect(() => {
    const sessionUserAnswerVote = () => {
      setUpVote(answerVotes?.includes(userVote?.vote));
    };
    sessionUserAnswerVote();
  }, [dispatch, allVotes]);

  const upVoteAnswer = async () => {
    if (userVote?.vote === true) {
      await dispatch(deleteAnswerVote(+answerId));
    } else {
      await dispatch(
        createAnswerVote({
          userId: userVote?.userId,
          vote: true,
          answerId: +answerId
        })
      );
    }
  };

  const downVoteAnswer = async () => {
    if (userVote?.vote === false) {
      await dispatch(deleteAnswerVote(+answerId));
    } else {
      await dispatch(
        createAnswerVote({
          userId: userVote?.userId,
          vote: downVote,
          answerId,
        })
      );
    }
  };

  let answerVoteCount = 0;

  answerVotes.map((vote) => {
    vote?.vote === true ? (answerVoteCount += 1) : (answerVoteCount -= 1);
  });

  const handleUpVote = async () => {
    if (userVote?.vote === false) {
      await dispatch(
        editAnswerVote({
          userId: sessionUser?.id,
          vote: true,
          answerId: +answerId,
        })
      ).then(async () => {
        setUpVote(!upVote);
      });
    } else {
      await upVoteAnswer().then(async () => setUpVote(!upVote));
    }
  };

  const handleDownVote = async () => {
    if (userVote?.vote === true){
      await dispatch(
        editAnswerVote({
          userId: sessionUser?.id,
          vote: false,
          answerId: +answerId,
        })
      ).then(async () => {
        setUpVote(!upVote);
      });
    } else {
      await downVoteAnswer().then(async () => setDownVote(!downVote));
    }
  };

  return (
    <>
      <div id="edit-answer-votes">
        <button id="edit-answer-vote-up" onClick={handleUpVote}>
          <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
        </button>
        <div id="edit-answer-vote-count">{answerVoteCount}</div>
        <button id="edit-answer-vote-down" onClick={handleDownVote}>
          <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}

export default EditAnswerVote;

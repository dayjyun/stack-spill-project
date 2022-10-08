import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestionVote,
  deleteQuestionVote,
  getAllVotes,
  editQuestionVote,
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
  const [upVoteStyle, setUpVoteStyle] = useState({});
  const [downVoteStyle, setDownVoteStyle] = useState({});

  useEffect(() => {
    dispatch(getAllVotes());
    const sessionUserQuestionVote = () => {
      setUpVote(questionVotes?.includes(userVote?.vote));
    };
    sessionUserQuestionVote();
  }, [dispatch]);

  useEffect(() => {
    if (userVote) {
      if (userVote?.vote === true) {
        setUpVoteStyle({ color: "rgb(0, 165, 0)" });
      } else if (userVote?.vote === false) {
        setDownVoteStyle({ color: "red" });
      } else {
        setUpVoteStyle({ color: "rgb(211, 211, 211)" });
      }
    }
  }, [userVote]);

  const upVoteQuestion = async () => {
    if (userVote?.vote === true) {
      await dispatch(deleteQuestionVote(+questionId));
      setUpVoteStyle({ color: "rgb(211, 211, 211)" });
    } else {
      await dispatch(
        createQuestionVote({
          userId: userVote?.userId,
          vote: true,
          questionId: +questionId,
        })
      );
      setUpVoteStyle({ color: "rgb(0, 165, 0)" });
    }
  };

  const downVoteQuestion = async () => {
    if (userVote?.vote === false) {
      await dispatch(deleteQuestionVote(+questionId));
      setDownVoteStyle({ color: "rgb(211, 211, 211)" });
    } else {
      await dispatch(
        createQuestionVote({
          userId: userVote?.userId,
          vote: false,
          questionId,
        })
      );
      setDownVoteStyle({ color: "red" });
    }
  };

  let questionVoteCount = 0;

  questionVotes.map((vote) => {
    return vote?.vote === true
      ? (questionVoteCount += 1)
      : (questionVoteCount -= 1);
  });

  const handleUpVote = async () => {
    if (sessionUser) {
      setUpVoteStyle({ color: "rgb(0, 165, 0)" });
      setDownVoteStyle({ color: "rgb(211, 211, 211)" });
      if (userVote?.vote === false) {
        await dispatch(
          editQuestionVote({
            userId: sessionUser?.id,
            vote: true,
            questionId: +questionId,
          })
        ).then(async () => {
          setUpVote(!upVote);
        });
      } else {
        await upVoteQuestion().then(async () => setUpVote(!upVote));
      }
    }
  };

  const handleDownVote = async () => {
    if (sessionUser) {
      setDownVoteStyle({ color: "red" });
      setUpVoteStyle({ color: "rgb(211, 211, 211)" });
      if (userVote?.vote === true) {
        await dispatch(
          editQuestionVote({
            userId: sessionUser?.id,
            vote: false,
            questionId: +questionId,
          })
        ).then(async () => {
          setUpVote(!upVote);
        });
      } else {
        await downVoteQuestion().then(async () => setDownVote(!downVote));
      }
    }
  };

  return (
    <>
      <div id="edit-question-votes">
        <button className="edit-question-vote-up" onClick={handleUpVote}>
          <i
            style={upVoteStyle}
            className="fa fa-arrow-circle-up"
            aria-hidden="true"
          ></i>
        </button>
        <div className="edit-question-vote-count">{questionVoteCount}</div>
        <button className="edit-question-vote-down" onClick={handleDownVote}>
          <i
            style={downVoteStyle}
            className="fa fa-arrow-circle-down"
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </>
  );
}
export default EditQuestionVote;

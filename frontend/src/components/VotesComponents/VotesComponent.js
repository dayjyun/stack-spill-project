import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVotes } from "../../store/votesReducer";
import "./VotesComponent.css";

function QuestionVotesComponent({ questionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allVotes = Object.values(useSelector((state) => state.votes));
  const questionVotes = allVotes.filter((vote) => vote?.questionId == questionId);
  console.log({allVotes})
//   console.log(questionVotes)

  useEffect(() => {
    dispatch(getAllVotes());
  }, [dispatch]);


  let voteCount = 0;
//   let trueVotes = []
//   let falseVotes = []
  let trueVotes = {}
  let falseVotes = {}

  questionVotes.map((vote) => {
    if (vote?.vote === true) {
      voteCount += 1;
    //   trueVotes.push(vote?.userId)
    trueVotes[vote?.userId] = vote?.userId
    } else if (vote?.vote === false) {
      voteCount -= 1;
    //   falseVotes.push(vote?.userId)
    }
  });

  console.log(trueVotes)
  console.log(falseVotes)

  return (
    <>
      <button>UP</button> {/* EditQuestionVote */}
      <button>DOWN</button> {/* EditQuestionVote */}
      <h1>{voteCount} Votes</h1>
    </>
  );
}

export default QuestionVotesComponent;

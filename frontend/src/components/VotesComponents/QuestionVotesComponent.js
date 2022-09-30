// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllVotes, getQuestionVote } from "../../store/votesReducer";
// import EditQuestionVote from "../EditComponents/EditVotes/EditQuestionVote";
// import "./QuestionVotesComponent.css";

// function QuestionVotesComponent({ questionId }) {
//   const dispatch = useDispatch();
//   const allVotes = Object.values(useSelector((state) => state.votes));
//   const questionVotes = allVotes.filter((vote) => vote?.questionId == questionId);

//   useEffect(() => {
//     dispatch(getAllVotes());
//     dispatch(getQuestionVote(questionId))
//   }, [dispatch, questionId]);

//   return (
//     <>
//       <EditQuestionVote questionId={questionId} />
//     </>
//   );
// }

// export default QuestionVotesComponent;

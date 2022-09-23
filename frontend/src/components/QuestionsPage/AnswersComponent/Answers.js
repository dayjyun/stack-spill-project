import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnswers } from "../../../store/answersReducer";
import { getAllUsers, getUser } from "../../../store/usersReducer";
import "./Answers.css";

function AnswersComponent({ questionId, allUsers }) {
  const dispatch = useDispatch();
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const answers = allAnswers.filter((answer) => answer?.questionId == questionId);

  useEffect(() => {
    dispatch(getAllUsers())
    // dispatch(getUser(userId))
    dispatch(getAllAnswers());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2 id="answers-number-text">{answers?.length} Answers</h2>
        {answers?.map((answer) => (
          <div key={answer?.id} id="answer-details">
            <div id="answer-body">{answer?.body}</div>
            {/* by {user?.username} */}
          </div>
        ))}
      </div>
    </>
  );
}

export default AnswersComponent;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnswers } from "../../../store/answersReducer";
import { getAllUsers } from "../../../store/usersReducer";
import "./Answers.css";

function AnswersComponent({ questionId }) {
  const dispatch = useDispatch();
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const answers = allAnswers.filter(
    (answer) => answer.questionId == questionId
  );
  const allUsers = Object.values(useSelector((state) => state.users));
  const userAnswer = allUsers.filter((user) => user.id == allAnswers.userId);
//   console.log({ allUsers });
//   console.log({ userAnswer });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAnswers());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2 id='answers-number-text'>{answers?.length} Answers</h2>
        {answers?.map((answer) => (
          <>
            <div key={answer?.id} id="answer-details">
              <div id="answer-body">{answer?.body}</div>
            </div>
            {/* <div>{allUsers}</div> */}
          </>
        ))}
      </div>
    </>
  );
}

export default AnswersComponent;

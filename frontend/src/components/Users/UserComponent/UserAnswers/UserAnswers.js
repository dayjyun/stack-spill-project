import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAnswers } from "../../../../store/answersReducer";
import { getAllQuestions } from "../../../../store/questionsReducer";
import { getUser, getUserAnswers } from "../../../../store/usersReducer";
import "./UserAnswers.css";

// Returns all questions where user has answered in.
// userAnswers = user.id == answer.userId
// question.id == answer.questionId(userAnswers)

function UserAnswers() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const userAnswers = allAnswers.filter((answer) => answer?.userId == userId); //array {2}
  const allQuestions = Object.values(useSelector((state) => state.questions)); //array {4}
  const questions = allQuestions.filter(question => question?.id == userAnswers[0])
  console.log(userAnswers)

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getAllAnswers());
    dispatch(getAllQuestions());
  }, [dispatch]);

  return (
    <>
      {/* {allQuestions?.map((question) => (
          <div key={question?.id}>
              {userAnswers?.find((answer) => answer?.questionId == question?.id)}
          </div>
        ))} */}
      {/* {userAnswers?.map((answer) => (
        <div key={answer?.id}>
          {allQuestions?.find((question) => question?.id == answer?.questionId)}
        </div>
      ))} */}
      {/* <div>
        {allQuestions.filter((question) => (
          <div>
            {userAnswers.find((answer) => question.id == answer?.questionId)}
          </div>
        ))}
        here
      </div> */}
      <h3>User Answers</h3>
    </>
  );
}

export default UserAnswers;

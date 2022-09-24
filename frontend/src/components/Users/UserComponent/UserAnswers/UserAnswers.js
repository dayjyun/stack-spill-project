import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAnswers } from "../../../../store/answersReducer";
import { getAllQuestions } from "../../../../store/questionsReducer";
import { getUser } from "../../../../store/usersReducer";
import "./UserAnswers.css";

// Returns all questions where user has answered in.
// * userAnswers = user.id == answer.userId (USERANSWERS)
// question.id == answer.questionId(userAnswers)

function UserAnswers() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const userAnswers = allAnswers.filter((answer) => answer?.userId == userId); //array {2}
  const allQuestions = Object.values(useSelector((state) => state.questions)); //array {4}
  //   const questions = allQuestions.filter((question) => question?.id == userAnswers);
  let res = [];

  for (let i = 0; i < allQuestions.length; i++) {
    let questions = allQuestions[i];
    for (let j = 0; j < userAnswers.length; j++) {
      let answers = userAnswers[j];
      if (answers.questionId == questions.id) {
        res.push(questions);
      }
    }
  }

  console.log(res);

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getAllAnswers());
    dispatch(getAllQuestions());
  }, [dispatch]);

  return (
    <>
      <h3>User Answers</h3>
      {res.map(x => (
        <div>{x?.title}</div>
      ))}
    </>
  );
}

export default UserAnswers;

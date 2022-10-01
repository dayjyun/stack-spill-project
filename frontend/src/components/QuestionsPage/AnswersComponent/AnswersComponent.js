import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllAnswers } from "../../../store/answersReducer";
import { getAllUsers } from "../../../store/usersReducer";
import EditAnswerModal from "../../EditComponents/EditAnswerModal/EditAnswerModal";
import EditAnswerVote from "../../EditComponents/EditVotes/EditAnswerVote";
import "./AnswersComponent.css";

function AnswersComponent({ questionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const answers = allAnswers.filter(
    (answer) => answer?.questionId == questionId
  );
  const allUsers = Object.values(useSelector((state) => state.users));

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAnswers());
  }, [dispatch]);

  let userAnswerEdit;

  answers.map((answer) => {
    if (answer?.userId == sessionUser?.id) {
      userAnswerEdit = (
        <EditAnswerModal answerId={answer?.id} questionId={questionId} />
      );
    }
  });

  return (
    <>
      <div id='answer-page-component'>
        <h2 id="answer-number-text">{answers?.length} Answers</h2>
          {answers?.map((answer) => (
            <div key={answer?.id} id="answer-card">
              <EditAnswerVote answerId={answer?.id} />
              <div id="answer-card-container">
                <h3 id="answer-body">{answer?.body}</h3>
                <div id="answer-user-info">
                  By{" "}
                  <Link
                  id="answer-component-user-link"
                  to={`/users/${answer?.userId}`}>
                    <img
                      id="answer-component-user-profileImage"
                      src={
                        allUsers?.find((user) => user?.id == answer?.userId)
                          ?.profileImage
                      }
                    />
                    {
                      allUsers?.find((user) => user?.id == answer?.userId)
                        ?.username
                    }
                  </Link>{" "}
                  {answer?.userId == sessionUser?.id && userAnswerEdit}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default AnswersComponent;

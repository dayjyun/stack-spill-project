import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllAnswers } from "../../../store/answersReducer";
import { getAllUsers } from "../../../store/usersReducer";
import EditAnswerModal from "../../EditComponents/EditAnswerModal/EditAnswerModal";
import "./AnswersComponent.css";

function AnswersComponent({ questionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allAnswers = Object.values(useSelector((state) => state.answers));
  const answers = allAnswers.filter((answer) => answer?.questionId == questionId);
  const allUsers = Object.values(useSelector((state) => state.users));
  let currentUser;

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAnswers());
  }, [dispatch]);

  let userAnswerEdit;

  answers.map((answer) => {
    if (answer?.userId == sessionUser?.id) {
      userAnswerEdit = <EditAnswerModal answerId={answer?.id} questionId={questionId}/>
    }
  });

  return (
    <>
      <div>
        <h2 id="answers-number-text">{answers?.length} Answers</h2>
        <div>
          {answers?.map((answer) => (
            <div key={answer?.id} id="answer-details">
              <div id="answer-body">{answer?.body}</div>
              By{" "}
              <Link to={`/users/${answer?.userId}`}>
                <img
                  id="answers-component-user-profileImage"
                  src={
                    allUsers?.find((user) => user?.id == answer?.userId)
                      ?.profileImage
                  }
                />
                {allUsers?.find((user) => user?.id == answer?.userId)?.username}
              </Link>
            </div>
          ))}
          {userAnswerEdit}
        </div>
      </div>
    </>
  );
}

export default AnswersComponent;

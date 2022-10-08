import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuestion } from "../../../store/questionsReducer";
import ConvertTime from "../../ConvertTime/ConvertTime";
import CreateAnswerForm from "../../CreateComponents/CreateAnswer/CreateAnswerForm";
import EditQuestionModal from "../../EditComponents/EditQuestionModal/EditQuestionModal";
import EditQuestionVote from "../../EditComponents/EditVotes/EditQuestionVote";
import LoginTextModal from "../../LoginFormModal/LoginTextModal";
import AnswersComponent from "../AnswersComponent/AnswersComponent";
import "./QuestionComponent.css";

function QuestionComponent() {
  const dispatch = useDispatch();
  let { questionId } = useParams();
  const sessionUser = useSelector((state) => state.session?.user);
  const allQuestions = Object.values(useSelector((state) => state?.questions));
  const question = allQuestions.find((question) => question?.id === +questionId);
  const allUsers = Object.values(useSelector((state) => state?.users));
  const currentUser = allUsers.find((user) => user?.id === +question?.userId);
  const allAnswers = Object.values(useSelector((state) => state?.answers));
  const answerExists = allAnswers.filter((answer) => answer?.userId === +sessionUser?.id && answer?.questionId === +question?.id);

  useEffect(() => {
    dispatch(getQuestion(+questionId));
  }, [dispatch, questionId]);

  let userQuestionEdit;
  if (sessionUser?.id === +question?.userId) {
    userQuestionEdit = <EditQuestionModal questionId={+questionId} />;
  }

  let createAnswerForm;
  if (sessionUser && answerExists?.length === 0) {
    createAnswerForm = <CreateAnswerForm questionId={+questionId} />;
  } else if (!sessionUser) {
    createAnswerForm = (
      <div id="create-answer-login-button">
        <LoginTextModal /> <div id="calb-text">to Answer</div>
      </div>
    );
  }

  return (
    <>
      <div id="question-page-component">
        <div key={question?.id} id="question-card">
          <EditQuestionVote questionId={questionId} />
          <div id="question-card-container">
            <div id="question-card-text-top">
              <h1 id="question-title">{question?.title}</h1> {userQuestionEdit}
            </div>
            <div id="question-body">{question?.body}</div>
            <div id="question-user-info">
              By{" "}
              <Link
                id="question-component-user-link"
                to={`/users/${currentUser?.id}`}
              >
                <img
                  id="question-component-user-profileImage"
                  alt='profile'
                  src={currentUser?.profileImage}
                />
                {currentUser?.username}
              </Link>
            </div>
            <div id="question-page-creation-info">
              Posted {ConvertTime(question?.createdAt)}
            </div>
          </div>
        </div>
        <AnswersComponent questionId={questionId} allUsers={allUsers} />
        {createAnswerForm}
      </div>
    </>
  );
}

export default QuestionComponent;

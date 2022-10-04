import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllAnswers } from "../../../store/answersReducer";
import { getQuestion } from "../../../store/questionsReducer";
import CreateAnswerForm from "../../CreateComponents/CreateAnswer/CreateAnswerForm";
import EditQuestionModal from "../../EditComponents/EditQuestionModal/EditQuestionModal";
import EditQuestionVote from "../../EditComponents/EditVotes/EditQuestionVote";
import AnswersComponent from "../AnswersComponent/AnswersComponent";
import "./QuestionComponent.css";

function QuestionComponent() {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.find((question) => question.id == questionId);
  const allUsers = Object.values(useSelector((state) => state.users));
  const currentUser = allUsers.find((user) => user.id == question?.userId);
  const allAnswers = Object.values(useSelector(state => state.answers))
  const userAnswer = allAnswers.find(answer => answer?.id == sessionUser?.id)
  console.log(userAnswer)

  useEffect(() => {
    dispatch(getAllAnswers())
    dispatch(getQuestion(questionId));
  }, [dispatch]);

  let userQuestionEdit;
  if (sessionUser?.id == question?.userId) {
    userQuestionEdit = <EditQuestionModal questionId={questionId} />;
  }

  let createAnswerComponent;
  if(sessionUser) {
    createAnswerComponent = <CreateAnswerForm questionId={questionId}/>
  }

  let answerComponent;
  // if (userAnswer?.id !== allAnswers?.userId) {
  //   answerComponent = (
  //     <AnswersComponent questionId={questionId} allUsers={allUsers} />
  //   );
  // }

  allAnswers.map(answer => {
    if(answer?.userId !== sessionUser?.id) {
      answerComponent = (
        <>
        <AnswersComponent questionId={questionId} allUsers={allUsers} />
        </>
      );
    }
  })

  // if (!userAnswer) {
  //   answerComponent = (
  //     <AnswersComponent questionId={questionId} allUsers={allUsers} />
  //   );
  // }

  return (
    <>
      <div id="question-page-component">
        <div key={question?.id} id="question-card">
          <EditQuestionVote questionId={questionId} />
          <div id="question-card-container">
            <div id='question-card-text-top'>
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
                  src={currentUser?.profileImage}
                />
                {currentUser?.username}
              </Link>
            </div>
          </div>
        </div>
        {/* <AnswersComponent questionId={questionId} allUsers={allUsers} /> */}
        {answerComponent}
        {createAnswerComponent}
      </div>
    </>
  );
}

export default QuestionComponent;

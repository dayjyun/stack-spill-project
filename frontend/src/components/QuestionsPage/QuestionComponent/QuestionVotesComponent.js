import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuestion } from "../../../store/questionsReducer";
import CreateAnswerForm from "../../CreateComponents/CreateAnswer/CreateAnswerForm";
import EditQuestionModal from "../../EditComponents/EditQuestionModal/EditQuestionModal";
import QuestionVotesComponent from "../../VotesComponents/QuestionVotesComponent";
import AnswersComponent from "../AnswersComponent/AnswersComponent";
import "./QuestionComponent.css";

function QuestionComponent() {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.find((question) => question.id == questionId);
  const allUsers = Object.values(useSelector(state => state.users))
  const currentUser = allUsers.find(user => user.id == question?.userId)

  useEffect(() => {
    dispatch(getQuestion(questionId));
  }, [dispatch]);

  let userQuestionEdit;
  if (sessionUser?.id == question?.userId) {
    userQuestionEdit = <EditQuestionModal questionId={questionId}/>
  }

  return (
    <>
      <div key={question?.id} id="question-card">
        <QuestionVotesComponent questionId={questionId}/>
        <h1 id="question-title">{question?.title}</h1>
        <h3 id="question-body">{question?.body}</h3>
        {userQuestionEdit}
        <div>
          By{" "}
          <Link to={`/users/${currentUser?.id}`}>
            <img id='question-component-user-profileImage' src={currentUser?.profileImage} />
            {currentUser?.username}
          </Link>
        </div>
      </div>
      <div>
        <AnswersComponent questionId={questionId} allUsers={allUsers}/>
      </div>
      <CreateAnswerForm questionId={questionId}/>
    </>
  );
}

export default QuestionComponent;

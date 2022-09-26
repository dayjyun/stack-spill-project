import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuestion } from "../../../store/questionsReducer";
import CreateAnswerForm from "../../CreateComponents/CreateAnswer/CreateAnswerForm";
import EditQuestionModal from "../../EditComponents/EditQuestionModal/EditQuestionModal";
import AnswersComponent from "../AnswersComponent/AnswersComponent";
import "./QuestionComponent.css";

function QuestionComponent() {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const allQuestions = Object.values(useSelector((state) => state.questions));
  const question = allQuestions.filter((question) => question.id == questionId)[0];
  const allUsers = Object.values(useSelector(state => state.users))
  const currentUser = allUsers.filter(user => user.id == question?.userId)[0]

  useEffect(() => {
    dispatch(getQuestion(questionId));
  }, [dispatch]);

  let userQuestionEdit;
  if (sessionUser?.id == question?.userId) {
    userQuestionEdit = <EditQuestionModal questionId={questionId}/>
  }

  let questionVotes
  if (questionId) {
    
  }

  return (
    <>
      <div key={question?.id} id="question-card">
        {/* VotesComponent */}
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../../store/usersReducer";
import EditUserModal from "../../EditComponents/EditUserModal/EditUserModal";
import UserAnswers from "./UserAnswers/UserAnswers";
import UserQuestions from "./UserQuestions/UserQuestions";
import "./UserComponent.css";

function UserComponent() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const allUsers = Object.values(useSelector((state) => state.users));
  const user = allUsers.filter((user) => user.id == userId)[0];
  const [bottomView, setBottomView ]= useState(<UserQuestions/>)

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  let editButton;

  if (sessionUser?.id == user?.id) {
    editButton = <EditUserModal />;
  }

  const handleQuestionsClick = () => {
    setBottomView(<UserQuestions />)
  }

  const handleAnswersClick = () => {
    setBottomView(<UserAnswers />)
  }

  return (
    <>
      <div id="user-component">
        <div id="user-component-info">
          <img id="user-component-image" src={user?.profileImage} />
          <div id="user-component-details">
            <h1>{user?.username}</h1>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            {editButton}
          </div>
        </div>
      </div>
      <div id="user-component-navLinks">
        <div id='user-component-questions' onClick={handleQuestionsClick}>Questions</div>
        <div id='user-component-answers' onClick={handleAnswersClick}>Answers</div>
      </div>
      <div>{bottomView}</div>
    </>
  );
}

export default UserComponent;

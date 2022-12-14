const GET_ALL_USERS = "users/getAllUsers";
const GET_USER = "users/getUser";
const GET_USER_QUESTIONS = "users/getUserQuestions";
const GET_USER_ANSWERS = "users/getUserAnswers";

// get all users
const getAll = (list) => {
  return {
    type: GET_ALL_USERS,
    list,
  };
};

export const getAllUsers = () => async (dispatch) => {
  const allUsers = await fetch("/api/users");

  if (allUsers.ok) {
    const resAllUsers = await allUsers.json();
    dispatch(getAll(resAllUsers));
  }
};

// get user
const getSpecificUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const getUser = (userId) => async (dispatch) => {
  const specificUser = await fetch(`/api/users/${userId}`);

  if (specificUser.ok) {
    const resSpecificUser = await specificUser.json();
    dispatch(getSpecificUser(resSpecificUser));
  }
};

// get user questions
const getQuestions = (list) => {
  return {
    type: GET_USER_QUESTIONS,
    list,
  };
};

export const getUserQuestions = (userId) => async (dispatch) => {
  const userQuestions = await fetch(`/api/users/${userId}/questions`);

  if (userQuestions.ok) {
    const resUserQuestions = await userQuestions.json();
    dispatch(getQuestions(resUserQuestions));
  }
};

// get user answers
const getAnswers = (list) => {
  return {
    type: GET_USER_ANSWERS,
    list,
  };
};

export const getUserAnswers = (userId) => async (dispatch) => {
  const userAnswers = await fetch(`/api/users/${userId}/answers`);

  if (userAnswers.ok) {
    const resUserAnswers = await userAnswers.json();
    dispatch(getAnswers(resUserAnswers));
  }
};

let initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      initialState = { ...state };
      action.list.forEach((user) => {
        initialState[user.id] = user;
      });
      return initialState;

    case GET_USER:
      return { ...state, [action.user.id]: action.user };

    case GET_USER_QUESTIONS:
      initialState = { ...state };
      if (action?.list?.length > 0) {
        action?.list?.forEach((question) => {
          initialState[question?.id] = question;
        });
      } else {
        return initialState;
      }

    case GET_USER_ANSWERS:
      initialState = { ...state };
      if (action?.list?.length > 0) {
        action?.list?.forEach((answer) => {
          initialState[answer?.id] = answer;
        });
      } else {
        return initialState;
      }

    default:
      return state;
  }
};

export default usersReducer;

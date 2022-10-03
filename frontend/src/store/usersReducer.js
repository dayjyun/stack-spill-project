import { csrfFetch } from "./csrf";

const GET_ALL_USERS = "users/getAllUsers";
const GET_USER = "users/getUser";
const GET_USER_QUESTIONS = 'users/getUserQuestions'
const GET_USER_ANSWERS = 'users/getUserAnswers'
const EDIT_USER = "users/editUser";

// get all users
const getAll = (list) => {
  return {
    type: GET_ALL_USERS,
    list
  }
}

export const getAllUsers = () => async (dispatch) => {
  const allUsers = await fetch('/api/users')

  if (allUsers.ok) {
    const resAllUsers = await allUsers.json()
    dispatch(getAll(resAllUsers))
  }
}

// get user
const getSpecificUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

export const getUser = (userId) => async (dispatch) => {
  const specificUser = await fetch(`/api/users/${userId}`)

  if (specificUser.ok) {
    const resSpecificUser = await specificUser.json();
    dispatch(getSpecificUser(resSpecificUser));
  }
}

// get user questions
const getQuestions = (list) => {
  return {
    type: GET_USER_QUESTIONS,
    list,
  };
}

export const getUserQuestions = (userId) => async (dispatch) => {
  const userQuestions = await fetch(`/api/users/${userId}/questions`)

  if (userQuestions.ok) {
    const resUserQuestions = await userQuestions.json()
    dispatch(getQuestions(resUserQuestions))
  }
}

// get user answers
const getAnswers = (list) => {
  return {
    type: GET_USER_ANSWERS,
    list
  }
}

export const getUserAnswers = (userId) => async (dispatch) => {
  const userAnswers = await fetch(`/api/users/${userId}/answers`)

  if (userAnswers.ok) {
    const resUserAnswers = await userAnswers.json()
    dispatch(getAnswers(resUserAnswers))
  }
}

// edit user
const updateUser = (user) => {
  return {
    type: EDIT_USER,
    user
  }
}

export const editUser = (userData) => async (dispatch) => {
  const { firstName, lastName, email, username, profileImage } = userData
  const formData = new FormData()

  formData.append("firstName", firstName)
  formData.append("lastName", lastName)
  formData.append("email", email)
  formData.append("username", username)

  if (profileImage) formData.append("profileImage", profileImage);

  const userEdit = await csrfFetch(`/api/users/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  });
  
  if (userEdit.ok) {
    const resUserEdit = await userEdit.json()
    dispatch(updateUser(resUserEdit))
  }
}

let initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_USERS:
      initialState = { ...state };
      action.list.forEach((user) => {
        initialState[user.id] = user;
      });
      return initialState;

    case GET_USER:
      return { ...state, [action.user.id]: action.user };

    case EDIT_USER:
      return { ...state, [action.user.id]: action.user };

    case GET_USER_QUESTIONS:
      initialState = { ...state }
      action.list.forEach(question => {
        initialState[action.question.id] = action.question;
      })
      return initialState

    case GET_USER_ANSWERS:
      initialState = { ...state }
      action.list.forEach((answer) => {
        initialState[answer.id] = answer;
      });

    default:
      return state;
  }
};

export default usersReducer;

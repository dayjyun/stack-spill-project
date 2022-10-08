import { csrfFetch } from "./csrf";

const GET_ALL_USERS = "users/getAllUsers";
const GET_USER = "users/getUser";
const GET_USER_ANSWERS = "users/getUserAnswers";
const EDIT_USER = "users/editUser";

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

// edit user
const updateUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

export const editUser = (userData) => async (dispatch) => {
  const { firstName, lastName, email, username, profileImage } = userData;

  console.log("---------", 1)

  const formData = new FormData();

  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("username", username);

  console.log("---------", 2);

  if (profileImage) formData.append("profileImage", profileImage);

  console.log("---------", 3);

  const userEdit = await csrfFetch(`/api/users/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  }).catch(err => {
    console.log(err.message)
  })

  console.log("---------", 4);

  if (userEdit.ok) {

    console.log("---------", 5);
    const resUserEdit = await userEdit.json();
    dispatch(updateUser(resUserEdit));
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

    case EDIT_USER:
      return { ...state, [action.user.id]: action.user };

    case GET_USER_ANSWERS:
      initialState = { ...state };
      action.list.forEach((answer) => {
        initialState[answer.id] = answer;
      });
    return initialState;

    default:
      return state;
  }
};

export default usersReducer;

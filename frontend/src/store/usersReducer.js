import { csrfFetch } from "./csrf";

const GET_ALL_USERS = "users/getAllUsers";
const GET_USER = "users/getUser";
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

// edit user
const updateUser = (user) => {
  return {
    type: EDIT_USER,
    user
  }
}

export const editUser = (user) => async (dispatch) => {
  const userEdit = await csrfFetch(`/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
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

    default:
      return state;
  }
};

export default usersReducer;

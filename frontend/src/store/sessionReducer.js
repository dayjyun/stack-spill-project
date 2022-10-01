import { csrfFetch } from "./csrf";

// types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
// const GET_ALL_USERS = 'users/getAllUsers'
// const GET_USER = 'users/getUser'
// const EDIT_USER = 'users/editUser'

// actions
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  // if (!response.ok) {
  //   return null;
  // }

  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// get current user
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/me");
  const data = await response.json();
  dispatch(setUser(data));

  // if (data.id) {
  //   dispatch(setUser(data));
  // }

  return response;
};


// log out
const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/logout", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// // get all users
// const getAll = (list) => {
//   return {
//     type: GET_ALL_USERS,
//     list
//   }
// }

// export const getAllUsers = () => async (dispatch) => {
//   const allUsers = await fetch('/api/users')

//   if (allUsers.ok) {
//     const resAllUsers = allUsers.json()
//     dispatch(getAll(resAllUsers))
//   }
// }

// // get user
// const getSpecificUser = (user) => {
//   return {
//     type: GET_USER,
//     user
//   }
// }

// export const getUser = (userId) => async (dispatch) => {
//   const specificUser = await fetch(`/api/users/${userId}`)

//   if (specificUser.ok) {
//     const resSpecificUser = specificUser.json();
//     dispatch(getSpecificUser(resSpecificUser));
//   }
// }

// // edit user
// const updateUser = (user) => {
//   return {
//     type: EDIT_USER,
//     user
//   }
// }

// export const editUser = (user) => async (dispatch) => {
//   const userEdit = await csrfFetch(`/api/users/${user.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(user)
//   })
//   if (userEdit.ok) {
//     const resUserEdit = userEdit.json()
//     dispatch(updateUser(resUserEdit))
//   }
// }

// reducers
let initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      if (action.payload.id) {
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      } else {
        return state
      }

    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;

    // case GET_ALL_USERS:
    //   initialState = { ...state };
    //   action.list.forEach((user) => {
    //     initialState[user.id] = user;
    //   });
    //   return initialState;

    // case GET_USER:
    //   return { ...state, [action.user.id]: action.user };

    // case EDIT_USER:
    //   return { ...state, [action.user.id]: action.user };

    default:
      return state;
  }
};

export default sessionReducer;

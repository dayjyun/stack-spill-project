import { csrfFetch } from "./csrf";

// types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

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
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// get current user
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/me");
  const data = await response.json();
  dispatch(setUser(data));
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
  const { firstName, lastName, username, email, password, profileImage } = user;
  const response = await csrfFetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
      profileImage
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

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

    default:
      return state;
  }
};

export default sessionReducer;

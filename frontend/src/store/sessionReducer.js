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

// sign up user
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password, profileImage } = user;
  let response;

  // if (profileImage) {
  //   const formData = new FormData();

  //   formData.append("firstName", firstName);
  //   formData.append("lastName", lastName);
  //   formData.append("username", username);
  //   formData.append("email", email);
  //   formData.append("password", password);
  //   formData.append("profileImage", profileImage);

  //   response = await csrfFetch(`/api/signup/profileImage`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     body: formData,
  //   });
  // } else {
    response = await csrfFetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if(response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return response;
    }
  // }
};

// edit user
export const editUser = (userData) => async (dispatch) => {
  const { firstName, lastName, email, username, profileImage } = userData;
  let userEdit;

  if (profileImage) {
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("profileImage", profileImage);

    userEdit = await csrfFetch(`/api/users/${userData.id}/profileImage`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  } else {
    userEdit = await csrfFetch(`/api/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }

  if (userEdit.ok) {
    const resUserEdit = await userEdit.json();
    dispatch(setUser(resUserEdit));
  }
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

// reducers
// let initialState = { user: null };
let initialState = {};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      if (action.payload.id) {
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      } else {
        return state;
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

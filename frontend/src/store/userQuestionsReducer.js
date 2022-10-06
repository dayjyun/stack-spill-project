const GET_USER_QUESTIONS = "users/getUserQuestions";

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

let initialState = {}

const userQuestionsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_USER_QUESTIONS:
      initialState = {}
      action.list.forEach(question => {
        initialState[question.id] = question;
      })
      return initialState

    default:
      return state;
  }
};

export default userQuestionsReducer

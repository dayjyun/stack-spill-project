const GET_ALL_QUESTIONS_SORT = "sortedQuestions/getAllQuestionsSort";

// get all questions sorted
const getAllQuestionsSort = (list) => {
  return {
    type: GET_ALL_QUESTIONS_SORT,
    list,
  };
};

export const getAllQuestionsSorted = (sortType) => async (dispatch) => {
  let allQuestions;

  if (sortType) {
    allQuestions = await fetch(`/api/questions/sort/${sortType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    allQuestions = await fetch("/api/questions");
  }

  if (allQuestions.ok) {
    const resAllQuestions = await allQuestions.json();
    dispatch(getAllQuestionsSort(resAllQuestions));
  }
};

let initialState = {}

export default function sortedQuestionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_QUESTIONS_SORT:
      initialState = {};
      action?.list?.forEach((question, i) => {
        initialState[i] = question;
      });
      return initialState;

    default:
      return state;
  }
}

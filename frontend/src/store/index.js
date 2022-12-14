import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./sessionReducer";
import questionReducer from "./questionsReducer";
import answerReducer from "./answersReducer";
import voteReducer from "./votesReducer";
import usersReducer from "./usersReducer";
import userQuestionsReducer from "./userQuestionsReducer";
import sortedQuestionsReducer from "./sortedQuestionsReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  answers: answerReducer,
  questions: questionReducer,
  sortedQuestions: sortedQuestionsReducer,
  users: usersReducer,
  userQuestions: userQuestionsReducer,
  votes: voteReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

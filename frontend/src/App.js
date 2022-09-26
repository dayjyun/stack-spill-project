import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import Users from "./components/Users/Users";
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";
import AboutPage from "./components/AboutPage/AboutPage";
import QuestionComponent from "./components/QuestionsPage/QuestionComponent/QuestionVotesComponent";
import UserComponent from "./components/Users/UserComponent/UserComponent";
import UserQuestions from "./components/Users/UserComponent/UserQuestions/UserQuestions";
import UserAnswers from "./components/Users/UserComponent/UserAnswers/UserAnswers";
import CreateQuestionForm from "./components/CreateComponents/CreateQuestion/CreateQuestionForm";
import QuestionVotesComponent from "./components/VotesComponents/QuestionVotesComponent";
import AnswerVotesComponent from "./components/VotesComponents/AnswerVotesComponent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/votes/questions">
            <QuestionVotesComponent />
          </Route>
          <Route path='/votes/answers'>
            <AnswerVotesComponent />
          </Route>
          <Route path="/questions/ask">
            <CreateQuestionForm />
          </Route>
          <Route path="/questions/:questionId">
            <QuestionComponent />
          </Route>
          <Route exact path="/">
            <QuestionsPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/users/:userId/questions">
            <UserQuestions />
          </Route>
          <Route path="/users/:userId/answers">
            <UserAnswers />
          </Route>
          <Route path="/users/:userId">
            <UserComponent />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

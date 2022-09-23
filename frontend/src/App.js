import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import Users from "./components/Users/Users";
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";
import AboutPage from "./components/AboutPage/AboutPage";
import Question from "./components/QuestionsPage/QuestionComponent/Question";

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
          <Route path='/questions/:questionId'>
            <Question />
          </Route>
          <Route exact path='/'>
            <QuestionsPage />
          </Route>
          <Route path='/about'>
            <AboutPage />
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

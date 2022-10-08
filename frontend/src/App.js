import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import Users from "./components/Users/Users";
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";
import QuestionComponent from "./components/QuestionsPage/QuestionComponent/QuestionComponent";
import UserComponent from "./components/Users/UserComponent/UserComponent";
import CreateQuestionForm from "./components/CreateComponents/CreateQuestion/CreateQuestionForm";
import Footer from "./components/Footer/Footer";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id='app-page'>
      <Navigation isLoaded={isLoaded} />
      <div id='app-content'>
        {isLoaded && (
          <Switch>
            <Route path="/questions/ask">
              <CreateQuestionForm />
            </Route>
            <Route path="/questions/:questionId">
              <QuestionComponent />
            </Route>
            <Route exact path="/">
              <QuestionsPage />
            </Route>
            <Route path="/users/:userId">
              <UserComponent />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route>
              <h1>404 Page</h1>
            </Route>
          </Switch>
        )}
      </div>
      <div id="navigation-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;

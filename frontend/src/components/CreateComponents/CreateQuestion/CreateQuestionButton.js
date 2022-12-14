import { useHistory } from "react-router-dom";
import "./CreateQuestionButton.css";

function CreateQuestionButton() {
  const history = useHistory();

  const handleAskQuestionButton = () => {
    history.push("/questions/ask");
  };

  return <button id='create-question-button' onClick={handleAskQuestionButton}>Ask Question</button>;
}

export default CreateQuestionButton;

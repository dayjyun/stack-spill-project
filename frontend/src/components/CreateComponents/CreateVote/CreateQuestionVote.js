import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionVote } from "../../../store/votesReducer";

function CreateQuestionVote({ questionId }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const allQuestions = Object.values(useSelector(state => state.questions))
    const question = allQuestions.find(question => question?.id == questionId)

}

export default CreateQuestionVote;

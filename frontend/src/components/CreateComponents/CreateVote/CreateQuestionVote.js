import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionVote } from "../../../store/votesReducer";

function CreateQuestionVote({ questionId }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(createQuestionVote({
            questionId,
            vote,
        }))
    })
}

export default CreateQuestionVote;

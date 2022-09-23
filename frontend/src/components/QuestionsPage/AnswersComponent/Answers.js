import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnswers } from '../../../store/answersReducer';
import './Answers.css'

function AnswersComponent({ questionId }) {
    const dispatch = useDispatch()
    const allAnswers = Object.values(useSelector(state => state.answers))
    const answers = allAnswers.filter(answer => answer.questionId == questionId)

    useEffect(() => {
        dispatch(getAllAnswers())
    }, [dispatch])

    return (
        <>
            <div>
                <h2>{answers.length} Answers</h2>
                {answers?.map(answer => (
                    <li key={answer?.id}>{answer?.body}</li>
                ))}
            </div>
        </>
    )
}

export default AnswersComponent;

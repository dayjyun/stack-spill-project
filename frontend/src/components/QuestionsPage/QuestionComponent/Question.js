import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getQuestion } from '../../../store/questionsReducer'
import './Question.css'

function Question() {
    const dispatch = useDispatch()
    const { questionId } = useParams()
    const allQuestions = Object.values(useSelector(state => state.questions))
    const question = allQuestions[+questionId]
    console.log(question)

    useEffect(() => {
        dispatch(getQuestion())
    }, [dispatch])

    return (
        <>
            <h1>Question Details</h1>
        </>
    )
}

export default Question

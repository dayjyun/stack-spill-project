import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getQuestion } from '../../../store/questionsReducer'
import './Question.css'

function Question() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getQuestion())
    })

    return (
        <>
            
        </>
    )
}

export default Question

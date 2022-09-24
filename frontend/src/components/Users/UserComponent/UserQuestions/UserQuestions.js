import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllQuestions } from '../../../../store/questionsReducer';
import './UserQuestions.css'

function UserQuestions() {
    const dispatch = useDispatch()
    const { userId } = useParams()
    // const allUsers = Object.values(useSelector(state => state.users))
    // const currUser = allUsers.filter(user => user.id == userId)[0]
    const allQuestions = Object.values(useSelector(state => state.questions))
    const userQuestions = allQuestions.filter(questions => questions.userId == userId)

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [dispatch])

    return (
        <>
            <h3>User Questions</h3>
            {userQuestions.map(question => (
                <div>
                    <div>{question?.title}</div>
                    <div>{question?.body}</div>
                </div>
            ))}
        </>
    )
}

export default UserQuestions;

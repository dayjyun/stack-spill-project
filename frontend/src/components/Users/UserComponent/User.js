import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../../store/usersReducer';
import './User.css'

function User() {
    const dispatch = useDispatch()
    const { userId } = useParams();
    const allUsers = Object.values(useSelector(state => state.users))
    const user = allUsers.filter(user => user.id == userId)[0]

    useEffect(() => {
        dispatch(getUser(userId))
    }, [dispatch, userId])

    return (
      <>
        <h1>{user?.username}</h1>
      </>
    );
}

export default User;

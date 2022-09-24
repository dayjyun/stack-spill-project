import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './EditUser.css'

function EditUserForm() {
    const currUser = useSelector(state => state.session.user)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [profileImage, setProfileImage] = useState('')

    return (
      <form>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            // placeholder
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            // placeholder
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            // placeholder
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            // placeholder
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Profile Image
          <input
            type="text"
            value={profileImage}
            // placeholder
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    );
}

export default EditUserForm

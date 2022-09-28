import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/sessionReducer";
import './DemoUserButton.css'

function DemoUserButton({ credential, password, setErrors }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDemoUserLogin = () => {
        dispatch(login({
            credential: "demo",
            password: "password"
        })).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
        history.push('/')
    }

    return (
        <button id='demo-user-button' onClick={handleDemoUserLogin}>Demo User</button>
    )
}

export default DemoUserButton;

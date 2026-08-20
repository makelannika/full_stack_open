import { useState } from "react"
import Notification from "./Notification"

const LoginForm = ({ onLogin, notification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        onLogin({ username, password })

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>log in to application</h2>
            <Notification notification={notification}/>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                <label>
                    password
                    <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
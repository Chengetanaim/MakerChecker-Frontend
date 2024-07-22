import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './Login.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [token, setToken] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password)
        setTimeout(() => {
            fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formData.toString(),
            }).then((res) => {
                if (!res.ok){
                    return res.json().then((errorData) => {
                        throw new Error(errorData.detail)})
                }
                console.log('Posted data for login');
                setIsPending(false);
                return res.json();
            }).then(data => {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('userId', data.user.id);
                history.push('/')
            }).catch(err => {
                setError(err.message);
                setIsPending(false);
            })
        }, 1000)
       
    }
    return ( 
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div>{error}</div>}
                Don't have an account?<Link to='/register'>  Register</Link>
                {!isPending && <button type="submit">Login</button>}
                {isPending && <button type="submit" disabled>Logging in...</button>}
                </form>
            </div>
        </div>
     );
}
 
export default Login;
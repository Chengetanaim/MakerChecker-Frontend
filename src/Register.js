import { useState } from "react";
import './Login.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetchRoles from "./useFetchRoles";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(1);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const {data:roles, isPending:isLoading, error:err} = useFetchRoles("http://127.0.0.1:8000/roles")
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const formData = {email:email, role_id:role, password:password}
        console.log(formData)
        setTimeout(() => {
            fetch('http://127.0.0.1:8000/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            }).then((res) => {
                if (!res.ok){
                    return res.json().then((errorData) => {
                        throw new Error(errorData.detail)})
                }
                setIsPending(false);
                return res.json();
            }).then(data => {
                history.push('/login')
            }).catch(err => {
                setError(err.message);
                setIsPending(false);
            })
        }, 1000)
       
    }
    return ( 
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>
                {isLoading && <p>Loading roles...</p>}
                <div className="input-group">
                    <label htmlFor="role">Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        {roles && roles.map(rol=> (
                            <option value={rol.id}>{rol.name}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}  />
                </div>
                {error && <div>{error}</div>}
                {!isPending && <button type="submit">Register</button>}
                {isPending && <button type="submit" disabled>Registering...</button>}
                </form>
            </div>
        </div>
     );
}
 
export default Register;
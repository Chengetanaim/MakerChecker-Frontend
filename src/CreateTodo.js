import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Login.css';
import './TodosPage.css'

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false);
    const history = useHistory('/');

    const token = localStorage.getItem('token');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = {title: title, description: description}
        setIsPending(true);
        fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`,},
            body: JSON.stringify(todo)
        }).then(res => {
            if (!res.ok){
                return res.json().then((errorData) => {
                    throw new Error(errorData.detail);
                })
            }
            // console.log(res)
            console.log('New todo has been added');
            setIsPending(false);
            return res.json()
            
        }).then(data => {
            history.push('/')
        }).catch(err => {
            setError(err.message);
            setIsPending(false);
        })
        
    }
  
    return ( 
    
        <div className="todo-container">
        
        <h2>Create Todo</h2>

        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}  />
            </div>
            <div className="input-group">
                <label htmlFor="password">Description</label>
                <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            {error && <div>{error}</div>}
            {!isPending && <button type="submit">Post Todo</button>}
            {isPending && <button type="submit" disabled>Posting...</button>}
        </form>

    </div>
      
     
     );
}
 
export default CreateTodo;
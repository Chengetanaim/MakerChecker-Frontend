import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TodosPage = () => {
    const [pending, setIsPending] = useState(true);
    const [todos, setTodos] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();

    const token = localStorage.getItem('token');
    useEffect(() => {
        const abortCont = new AbortController();
        fetch('http://127.0.0.1:8000/todos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            if (!res.ok){
                    return res.json().then((errorData) => {
                        throw new Error(errorData.detail)})
                }
            return res.json()
        }).then(data => {
            setTodos(data);
            console.log(todos);
            setIsPending(false);
        }).catch(err => {
            setIsPending(false);
            setError(err.message);
           
        })
    }, 'http://127.0.0.1:8000/todos')
    return ( 
        <div className="todo-container">
            <h2>My-Todo-List</h2>
            {pending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {error === "Could not validate credentials" && <div>{history.push('/login')}</div>}
            {todos && 
                <ul className="todo-list">
                    {todos.map(todo => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                    
                </ul>
            }
            {todos && <button onClick={() => history.push('/create-todo')}>Add todo</button>}
      
           
        </div>
     );
}
 
export default TodosPage;
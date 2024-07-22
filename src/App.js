import Login from './Login';
import TodosPage from './TodosPage';
import CreateTodo from './CreateTodo';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            
            <Route exact path='/'>
              <TodosPage/>
            </Route>
            <Route path='/login'>
              <Login/>
            </Route>
            <Route path='/create-todo'>
              <CreateTodo/>
            </Route>
            <Route path='/register'>
              <Register/>
            </Route>
          </Switch>
   
      </Router>
      
    </div>
  );
}

export default App;

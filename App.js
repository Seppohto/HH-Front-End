import React, { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState({desc: '', date: ''});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const deleteRow = (idx) => {
    const rows = todos.filter((todo, i) => i !== idx);
    setTodos(rows);
  }


  return (
    <div className="App">
      <h1>Simple Todolist</h1>
      <fieldset>
        <legend align="left">Add todo:</legend>
        <form onSubmit={addTodo} name="Add todo">
          <label>Description:</label>
          <input type="text" name="desc" value={todo.desc} onChange={inputChanged} />
          <label>Date:</label>
          <input type="date" name="date" value={todo.date} onChange={inputChanged} />
          <input type= "submit" value="Add" />
        </form>
      </fieldset>
      <table id="todos">
        <tbody>
          <tr><td><b>Date</b></td><td><b>Description</b></td></tr>
          {
          todos.map((todo, idx) => 
                <tr key={idx}>
                <td>{todo.date}</td>
                <td>{todo.desc}</td>
                <td><button name="delete" onClick={() => deleteRow(idx)}>Delete</button></td>
              </tr>
            
           
            
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
  const [todo, setTodo] = useState({desc: '', date: '', prio: ''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  }

  const columns= [
    { headerName: "Description",field:"desc",
    sortable:true, filter:true, floatingFilter:true},
    { headerName: "Date",field:"date",
    sortable:true, filter:true, floatingFilter:true},
    { headerName: "Priority",field:"prio",
    sortable:true, filter:true, floatingFilter:true,
    cellStyle:params=> params.value===  "High"? {color:'red'}: {color:'black'}}
  ]
  const deleteTodo= () => {
    if (gridRef.current.getSelectedNodes().length> 0) {
    setTodos(todos.filter((todo, index) => index!== gridRef.current.getSelectedNodes()[0].childIndex))
    console.log(todos)
  }
  else {
    alert('Selectrow first');
  }
}

  return (
    <div className="App">
      <h1>Simple Todolist</h1>
      <fieldset>
        <legend align="left">Add todo:</legend>
          <input type="text" placeholder="Description" name="desc" value={todo.desc} onChange={inputChanged} />
          <input type="date" placeholder="Date" name="date" value={todo.date} onChange={inputChanged} />
          <input type="text" placeholder="Priority" name="prio" value={todo.prio} onChange={inputChanged} />          
        <button onClick={() =>addTodo()}>Add</button>        
        <button onClick={() =>deleteTodo()}>Delete</button>
      </fieldset>
      
      <div className="ag-theme-material" 
      style={{ height: 400, width: 600, margin: 'auto' }}>
        <AgGridReact
            ref={gridRef}
            onGridReady={ params=> gridRef.current= params.api }
            rowSelection="single"
            rowData={todos}
            columnDefs={columns}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;

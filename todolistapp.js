import React, { useState, useRef } from 'react';
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import TextField from '@mui/material/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';



function TodolistApp() {
  const [todo, setTodo] = useState({desc: '', date: '', prio: ''});
  const [todos, setTodos] = useState([]);  
  const [selectedDate, handleDateChange] = useState(new Date());
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  } 
  
  const yourChangeDateFunc = (date) => {
    handleDateChange(date);
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const newDate = day+"."+month+"."+year;
    setTodo({...todo, date: newDate});
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
        <Stack spacing={2} direction="row" margin="auto" align="center">
          <TextField id="description" label="Description" variant="outlined"
           type="text" placeholder="Description" name="desc" value={todo.desc} 
           onChange={inputChanged} />
           
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedDate} onChange={date => yourChangeDateFunc(date)} />
          </MuiPickersUtilsProvider>   

          <TextField id="priority" label="Priority" variant="outlined"
           type="text" placeholder="Priority" name="prio" value={todo.prio}
           onChange={inputChanged} />          
        
          <Button variant="outlined" onClick={() =>addTodo()}>Add</Button>        
          <Button variant="outlined" onClick={() =>deleteTodo()}>Delete</Button>
        </Stack>
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

export default TodolistApp;
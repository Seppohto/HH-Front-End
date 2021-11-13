import React from 'react';

export default function Todotable(props) {
    
    return(
        <div>
            <table id="todos">
            <tbody>
                <tr>
                    <td><b>Date</b></td>
                    <td><b>Description</b></td>
                    <td><b>Priority</b></td>                
                </tr>
                {
                props.todos.map((todo, idx) => 
                        <tr key={idx}>
                        <td>{todo.date}</td>
                        <td>{todo.desc}</td>
                        <td>{todo.prio}</td>
                        <td><button name="delete" onClick={() =>props.deleteRow(idx)}>Delete</button></td>
                    </tr>
                    )
                }
            </tbody>
            </table>
        </div>
    )
}

import React, { useState } from 'react';
import './App.css'
import TodoList, { initialTodoList } from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
    const [newTodoList, setTodoList] = useState( initialTodoList );
    let len = newTodoList.length;

    const addTodo = (title) => {
        const newId = newTodoList[len - 1].id + 1;
        let newItem = { id: newId, title }
        setTodoList([...newTodoList, newItem]);
    };

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            <TodoList todoList={newTodoList}/>
        </>
    )
}

export default App

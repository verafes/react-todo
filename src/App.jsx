import { useState } from 'react';
import './App.css'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
    // State and function to manage todo list items
    const [todoList, setTodoList] = useState( [] );
    const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            <TodoList todos={todoList}/>
        </>
    )
}

export default App

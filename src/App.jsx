import { useState, useEffect } from 'react';
import './App.css'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
    // initialize state with parsed list from localStorage or empty arr
    const [todoList, setTodoList] = useState(
        JSON.parse(localStorage.getItem('savedTodoList')) || []
    );

    // save todoList to localStorage on change
    useEffect(() => {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }, [todoList]);

    // adding a new todo to the list
    const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };

    // removing a todo from the list by its id
    const removeTodo = (id) => {
        const newTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(newTodoList);
    };

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
            <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
        </>
    )
}

export default App

import { useState, useEffect } from 'react';
import './App.css'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
    // initialize state with empty arr and loading state
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        new Promise((resolve, reject) =>
            setTimeout(() =>
                    resolve({
                        data: {
                            todoList: JSON.parse(localStorage.getItem("savedTodoList")),
                        },
                    }), 2000
            )
        ).then((result) => {
            setTodoList(result.data.todoList);
            setIsLoading(false);
        });
    }, []);

    // hook to save todoList to localStorage on change after loading is completed
    useEffect(() => {
        if (isLoading === false) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }
    }, [todoList, isLoading]);

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
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
                    <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
                </>
            )}
        </>
    )
}

export default App

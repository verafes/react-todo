import { useState, useEffect } from 'react';
import './App.css'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
    // initialize state with empty arr and loading state
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // fetching data from Airtable
    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            },
        };

        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            // Transforming Airtable records into the todoList format
            const todos = data.records.map(todo => ({
                id: todo.id,
                title: todo.fields.title,
            }));

            // Updating state with the fetched todos
            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    // hook to fetch data from API
    useEffect(() => {
        fetchData();
    }, []);

    // posting a new todo to the list
    const addTodo = async (todo) => {
        const titleData = {
            fields: {
                title: todo.title,
            },
        };
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            },
            body: JSON.stringify(titleData),
        };
        try {
            console.log('Request Payload:', JSON.stringify(titleData, null, 2));
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error has occurred: ${response.status}`);
            }
            const todo = await response.json();
            const newTodo = { id: todo.id, title: todo.fields.title };
            setTodoList([...todoList, newTodo]);
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    // removing a todo from the list by its id from remote site
    const removeTodo = async (id) => {
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            },
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error has occurred: ${response.status}`);
            }
            const newTodoList = todoList.filter(function (todo) {
                return id !== todo.id;
            });
            setTodoList(newTodoList);
        } catch (error) {
            console.log(error.message);
        }
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

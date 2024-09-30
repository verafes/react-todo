import { useState, useEffect } from 'react';
import listIcon from "../img/list.png";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import PropTypes from "prop-types";


function TodoContainer({ tableName, baseId, apiKey }) {
    // initialize state with empty arr and loading state
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // fetching data from Airtable
    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        };

        const url = `https://api.airtable.com/v0/${baseId}/${tableName}??view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
        console.log("Request URL:", url);
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
    const addTodo = async (title) => {
        const titleData = {
            fields: {
                title: title,
            },
        };
        const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
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
        const url = `https://api.airtable.com/v0/${baseId}/${tableName}/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
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
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={listIcon} alt="List Icon"
                     style={{width: '48px', height: '48px', marginRight: '16px'}}/>
                <h1>Todo List</h1>
            </div>
            {isLoading ? (
                <p className="Loading">Loading...</p>
            ) : (
                <>
                    <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
                    <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
                </>
            )}
        </>
    )
}

TodoContainer.propTypes = {
    tableName: PropTypes.string.isRequired,
    baseId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
};

export default TodoContainer;
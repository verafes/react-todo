import { useState, useEffect } from 'react';
import listIcon from "../img/list.png";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import PropTypes from "prop-types";
import style from './TodoContainer.module.css';


function TodoContainer({ tableName, baseId, apiKey }) {
    // initialize state with empty arr and loading state
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [sortField, setSortField] = useState("asc");
    const [sortOrder, setSortOrder] = useState("title");

    // function comparator for sorting numerically, mix numeric-string, and alphabetically
    const sortComparator = (a, b, ascending) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        const isNumericA = !isNaN(titleA);
        const isNumericB = !isNaN(titleB);

        if (isNumericA && isNumericB) {
            return ascending ? titleA - titleB : titleB - titleA;
        } else if (isNumericA) {
            return ascending ? -1 : 1;
        } else if (isNumericB) {
            return ascending ? 1 : -1;
        } else {
            return ascending ? (titleA < titleB ? -1 : titleA > titleB ? 1 : 0) : (titleA > titleB ? -1 : titleA < titleB ? 1 : 0);
        }
    };

    // sort by title (A-Z)
    const sortByTitleAsc = () => {
        const newTodoList = [...todoList];
        newTodoList.sort((a, b) => sortComparator(a, b, true));
        setTodoList(newTodoList);
    };

    // sort by title (Z-A)
    const sortByTitleDesc = () => {
        const newTodoList = [...todoList];
        newTodoList.sort((a, b) => sortComparator(a, b, false));
        setTodoList(newTodoList);
    };

    // sort by createdTime (A-Z)
    const onSortByDateAsc = () => {
        const sortDate = (a, b) => {
            const dateA = new Date(a.createdTime);
            const dateB = new Date(b.createdTime);
            return dateA - dateB; // Ascending order
        };

        const newTodoList = [...todoList];
        newTodoList.sort(sortDate);
        setTodoList(newTodoList);
    };

    // sort by createdTime (Z-A)
    const onSortByDateDesc = () => {
        const sortDate = (a, b) => {
            const dateA = new Date(a.createdTime);
            const dateB = new Date(b.createdTime);
            return dateB - dateA; // Descending order
        };

        const newTodoList = [...todoList];
        newTodoList.sort(sortDate);
        setTodoList(newTodoList);
    };


    // fetching data from Airtable
    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        };

        const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

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
                createdTime: todo.createdTime,
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
        fetchData(tableName);
        console.log("fetchdata", fetchData(tableName));
    }, [tableName]);

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

    // Function to handle Sort Toggle
    const handleSortToggle = (field) => {
        if (sortField === field) {
            setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }

        if (field === "title") {
            sortOrder === "asc" ? sortByTitleAsc() : sortByTitleDesc();
        } else if (field === "createdTime") {
            sortOrder === "asc" ? onSortByDateAsc() : onSortByDateDesc();
        }
    };

    return (
        <>
            <div className={style.container}>
                <img src={listIcon} alt="List Icon" className={style.icon}/>
                <h1>{tableName}</h1>
            </div>
            {isLoading ? (
                <p className="Loading">Loading...</p>
            ) : (
                <>
                    <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
                    <div className={style.sortButtonContainer}>
                        <button onClick={() => handleSortToggle("title")}>
                            Sort by Title {sortField === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                        </button>
                        <button onClick={() => handleSortToggle("createdTime")}>
                            Sort by Date {sortField === "createdTime" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                        </button>
                    </div>
                    <TodoList
                        todoList={todoList}
                        onRemoveTodo={removeTodo}/>
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
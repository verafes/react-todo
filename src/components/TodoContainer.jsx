import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import listIcon from "../img/list.png";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import SortButtons from "./SortButtons.jsx";
import PropTypes from "prop-types";
import styles from './TodoContainer.module.css';


function TodoContainer({ tableName, baseId, apiKey }) {
    // initialize state with empty arr and loading state
    const { listName } = useParams();
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isListLong, setIsListLong] = useState(false);

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

    // Function to handle Sort Toggle
    const handleSortToggle = (field) => {
        let newSortOrder = sortOrder;
        if (sortField === field) {
            newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        } else {
            newSortOrder = "asc";
        }

        setSortField(field);
        setSortOrder(newSortOrder);

        const newTodoList = [...todoList];
        if (field === "title") {
            newTodoList.sort((a, b) => sortComparator(a, b, newSortOrder === "asc"));
        } else if (field === "createdTime") {
            newTodoList.sort((a, b) => {
                const dateA = new Date(a.createdTime);
                const dateB = new Date(b.createdTime);
                return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
        }
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
            const todos = data.records
                .filter(todo => todo.fields.list === listName)
                .map(todo => ({
                    id: todo.id,
                    title: todo.fields.title,
                    createdTime: todo.createdTime,
                    list: todo.fields.list,
                }));

            // Updating state with the fetched todos
            setTodoList(todos);
            setIsLoading(false);

            setIsListLong(todos.length > 15)
        } catch (error) {
            console.error(error.message);
        }
    };

    // hook to fetch data from API
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchData();
    }, [listName]);

    // posting a new todo to the list
    const addTodo = async (title) => {
        const titleData = {
            fields: {
                title: title,
                list: listName,
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
            const newTodo = {
                id: todo.id,
                title: todo.fields.title,
                createdTime: todo.createdTime,
                list: todo.fields.list,
            };
            setTodoList([...todoList, newTodo]);

            setIsListLong(todoList.length + 1 > 15);
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

            setIsListLong(newTodoList.length > 15);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className={`${styles.container} ${isListLong ? styles.longListPadding : ''}`}>
                <img src={listIcon} alt="List Icon" className={styles.icon}/>
                <h1>{listName}</h1>
            </div>
            {isLoading ? (
                <p className="Loading" role="alert" aria-live="assertive">
                    Loading...
                </p>
            ) : (
                <>
                    <AddTodoForm onAddTodo={addTodo} todoList={todoList}/>
                    <SortButtons
                        sortField={sortField}
                        sortOrder={sortOrder}
                        handleSortToggle={handleSortToggle}
                    />
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

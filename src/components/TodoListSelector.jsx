import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import selectorStyles from './TodoListSelector.module.css';
import styles from './TodoContainer.module.css';
import listIcon from "../img/list.png";

function TodoListSelector({ tableName, baseId, apiKey }) {
    const [todoLists, setTodoLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch distinct Todo lists
    const fetchTodoLists = async () => {
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

            // Extract unique todo list names
            const lists = Array.from(new Set(data.records.map(todo => todo.fields.list)));

            setTodoLists(lists); // Set the lists in state
            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchTodoLists();
    }, []);

    // Handle clicking on a list
    const handleListClick = (listName) => {
        navigate(`/todos/${listName}`);
    };

    return (
        <div >
            <div className={styles.container}>
                <img src={listIcon} alt="List Icon" className={styles.icon}/>
                <h1>My Todo Lists</h1>
            </div>
            <div className={selectorStyles.listContainer}>
                <h2>Select a Todo List</h2>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul >
                        {todoLists.map(list => (
                            <li key={list} className={selectorStyles.listsItem}>
                                <a className={selectorStyles.link}
                                   onClick={() => handleListClick(list)}>
                                    {list}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

TodoListSelector.propTypes = {
    tableName: PropTypes.string.isRequired,
    baseId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
};

export default TodoListSelector;
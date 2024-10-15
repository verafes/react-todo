import { useState } from 'react';
import PropTypes from "prop-types";
import style from './TodoListItem.module.css';

// Component to display a single todo item and remove item button
function TodoListItem({ todo, onRemoveTodo }) {
    const [isCompleted, setIsCompleted] = useState(false);

    // Function to toggle the completion status of the todo item
    const handleToggleCompletion = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <li className={style.listItem}>
            <div className={style.listItemContent}>
                <span
                    className={`${style.todoText} ${isCompleted ? style.completed : ''}`}
                    onClick={handleToggleCompletion}
                    role="button"
                >
                    {todo.title}
                </span>
                <button
                    className={style.removeButton}
                    type="button"
                    onClick={() => onRemoveTodo(todo.id)}
                >
                    Remove
                </button>
            </div>
        </li>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
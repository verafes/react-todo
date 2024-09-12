import style from './TodoListItem.module.css';

// Component to display a single todo item and remove item button
function TodoListItem({ todo, onRemoveTodo }) {
    return (
        <li className={style.listItem}>
            <div className={style.listItemContent}>
                <span className={style.todoText}>{todo.title}</span>
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

export default TodoListItem;
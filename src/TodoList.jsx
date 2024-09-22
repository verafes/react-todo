import TodoListItem from './TodoListItem.jsx';
import style from './TodoListItem.module.css';

// mapping over todoList array
function TodoList({ todoList, onRemoveTodo }) {
    return (
        <ul className={style.todoList}>
            {todoList.map((item) => (
                <TodoListItem
                    key={item.id}
                    todo={item}
                    onRemoveTodo={onRemoveTodo}
                    className={style.todoListItem}
                />
            ))}
        </ul>
    );
}

export default TodoList;
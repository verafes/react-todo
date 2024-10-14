import TodoListItem from './TodoListItem.jsx';
import PropTypes from "prop-types";
import style from './TodoList.module.css';

// mapping over todoList array
function TodoList({ todoList, onRemoveTodo }) {
    return (
        <ul className={style.todoList} role="list" aria-label="Todo List">
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

TodoList.propTypes = {
    todoList: PropTypes.array,
    onRemoveTodo: PropTypes.func,
};

export default TodoList;
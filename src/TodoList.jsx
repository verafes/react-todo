import TodoListItem from './TodoListItem.jsx';

// mapping over todoList array
function TodoList({ todoList, onRemoveTodo }) {
    return (
        <ul>
            {todoList.map((item) => (
                <TodoListItem
                    key={item.id}
                    todo={item}
                    onRemoveTodo={onRemoveTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;
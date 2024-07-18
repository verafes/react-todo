import TodoListItem from './TodoListItem.jsx';

// mapping over todoList array
function TodoList({ todoList }) {
    return (
        <ul>
            {todoList.map((item) => (
                <TodoListItem key={item.id} todo={item}/>
            ))}
        </ul>
    );
}

export default TodoList;
import TodoListItem from './TodoListItem.jsx';

// mapping over todoList array
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map((item) => (
                <TodoListItem key={item.id} todo={item}/>
            ))}
        </ul>
    );
}

export default TodoList;
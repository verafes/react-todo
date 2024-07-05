import TodoListItem from './TodoListItem.jsx';

export const initialTodoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Read book" },
    { id: 3, title: "Practice coding" }
]

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
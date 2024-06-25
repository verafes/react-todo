const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Read book" },
    { id: 3, title: "Practice coding" }
]

function TodoList() {
    return (
        <ul>
            {todoList.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    );
}

export default TodoList;
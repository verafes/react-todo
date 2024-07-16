import {useState} from 'react';

function AddTodoForm({ onAddTodo, todoList }) {
    // New state variable and function to handle title change
    const [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange(event) {
        console.log(todoTitle);
        event.preventDefault();
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    // Function to handle form submission
    const handleAddTodo = (event) => {
        event.preventDefault();
        // Calculate nextId based on the current length of todoList
        const nextId = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;
        const newTodo = {
            id: nextId,
            title: todoTitle,
        };
        onAddTodo(newTodo);
        setTodoTitle("");
    };
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title </label>
            <input
                id="todoTitle"
                type="text"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
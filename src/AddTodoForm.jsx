import {useState} from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
    // New state variable and function to handle title change
    const [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange(event) {
        console.log(todoTitle);
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    // Function to handle form submission
    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(todoTitle);
        setTodoTitle("");
    };
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                id="todoTitle"
                type="text"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
            >
                <strong>Title: </strong>
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;
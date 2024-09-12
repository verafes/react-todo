import {useState} from 'react';
import InputWithLabel from './InputWithLabel';
import style from "./AddTodoForm.module.css";

function AddTodoForm({ onAddTodo }) {
    // New state variable and function to handle title change
    const [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange(event) {
        // console.log(todoTitle);
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
        <form onSubmit={handleAddTodo} className={style.form}>
                <InputWithLabel
                    id="todoTitle"
                    type="text"
                    name="title"
                    value={todoTitle}
                    onChange={handleTitleChange}
                >
                    <strong>Title: </strong>
                </InputWithLabel>
                <button className={style.submitButton} type="submit">Add</button>
        </form>
);
}

export default AddTodoForm;
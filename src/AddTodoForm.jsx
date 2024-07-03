function AddTodoForm(todoprops) {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.elements.title.value;
        console.log(todoTitle);
        todoprops.onAddTodo(todoTitle);
        event.target.reset();
    };
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title </label>
            <input id="todoTitle" name="title" />
            <button type="submit">Add</button>
        </form>
    );
}
export default AddTodoForm;
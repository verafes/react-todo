import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "../components/TodoContainer.module.css";
import newFormStyles from "./NewListPage.module.css";
import formStyles from "../components/AddTodoForm.module.css";
import inputStyles from "../components/InputWithLabel.module.css";
import listIcon from "../img/list.png";

function NewListPage() {
    const [listName, setListName] = useState('');
    const navigate = useNavigate();

    // handleSubmit function
    const handleSubmit = (e) => { // Added handleSubmit function
        e.preventDefault();
        if (listName.trim()) {
            navigate(`/todos/${listName}`);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <img src={listIcon} alt="List Icon" className={styles.icon}/>
                <h1>New Todo List</h1>
            </div>
            <div className={newFormStyles.form}>
                <p style={{fontSize: '1.5em', textAlign: 'center'}}>Enter a name for your new todo list.</p>
                <form onSubmit={handleSubmit}>
                    <div className={newFormStyles.formRow}>
                        <input
                            type="text"
                            placeholder="New List Name"
                            className={inputStyles.inputField}
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            aria-label="Name of the new todo list"
                            required
                        />
                        <button
                            type="submit"
                            className={formStyles.submitButton}
                        >
                            Create
                        </button>
                    </div>
                </form>
                <Link to="/mylists" className="view-lists-link" aria-label="View my todo lists">
                    View My Todo Lists
                </Link>
                <br/>
                <Link to="/nonexistent" className="view-lists-link" aria-label="Go to 404 page example">
                    Go to 404 Page
                </Link>
            </div>
        </div>
    );
}

export default NewListPage;
import { Link } from 'react-router-dom';
import styles from "../components/TodoContainer.module.css";
import newFormStyles from "./NewListPage.module.css";
import formStyles from "../components/AddTodoForm.module.css";
import inputStyles from "../components/InputWithLabel.module.css";
import listIcon from "../img/list.png";

function NewListPage() {
    return (
        <div>
            <div className={styles.container}>
                <img src={listIcon} alt="List Icon" className={styles.icon}/>
                <h1>New Todo List</h1>
            </div>
            <div className={newFormStyles.form}>
                <p style={{fontSize: '1.5em', textAlign: 'center'}}>Enter a name for your new todo list.</p>
                <form>
                    <div className={newFormStyles.formRow}>
                        <input
                            type="text"
                            placeholder="New List Name"
                            className={inputStyles.inputField}
                        />
                        <button
                            type="submit"
                            className={formStyles.submitButton}
                        >
                            Create
                        </button>
                    </div>
                </form>
                <Link to="/mylists" className="view-lists-link">
                    View My Todo Lists
                </Link>
                <br/>
                <Link to="/nonexistent" className="view-lists-link">
                    Go to 404 Page
                </Link>
            </div>
        </div>
    );
}

export default NewListPage;
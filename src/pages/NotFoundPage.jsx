import listIcon from "../img/list.png";
import styles from "../components/TodoContainer.module.css";
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>404</h1>
            <p style={{marginBottom: '2rem'}}>Page Not Found</p>
            <div style={{marginBottom: '1.5rem'}}>
                <img src={listIcon} alt="List Icon" className={styles.icon}/>
            </div>
            <div >
                <Link to="/mylists" className="view-lists-link" aria-label="View my todo lists">
                    View My Todo lists
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
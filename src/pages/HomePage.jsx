import { Link } from 'react-router-dom';
import listIcon from "../img/list.png";
import style from "../components/TodoContainer.module.css";


function HomePage() {
    return (
        <div>
            <div className="home-container">
                <h1>Welcome <br/><span style={{fontSize: '0.8em'}}>to the</span><br/> Todo App</h1>
                <img src={listIcon} alt="List Icon" className={style.icon}/>
                <p style={{fontSize: '1.5em', textAlign: 'center', marginBottom: '2rem'}}>
                    Create, edit and manage <br/>your todo lists.
                </p>
                <Link to="/mylists" className="view-lists-link">
                    View My Todo Lists
                </Link>
            </div>
        </div>
    );
}

export default HomePage;

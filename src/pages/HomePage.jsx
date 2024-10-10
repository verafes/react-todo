
import listIcon from "../img/list.png";
import style from "../components/TodoContainer.module.css";


function HomePage() {
    return (
        <div>
            <div className="home-container">
                <h1>Welcome <br/> to the Todo App</h1>
                <img src={listIcon} alt="List Icon" className={style.icon}/>
                <p style={{fontSize: '1.5em', textAlign: 'center'}}>Create, edit and manage <br/>your todo
                    lists.</p>
                {/*<Link to="/mylists" - not work }>*/}
                {/*    View My Todo Lists*/}
                {/*</Link>*/}
            </div>
        </div>
    );
}

export default HomePage;

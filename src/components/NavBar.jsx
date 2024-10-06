import {Link} from 'react-router-dom';
import style from './NavBar.module.css';

function NavBar() {

    return (
        <nav className={style.navBar}>
            <ul className={style.navList}>
                <li className={style.navItem}>
                    <Link to="/">Home</Link>
                </li>
                <li className={style.navItem}>
                    <Link to="/mylists">My lists</Link>
                </li>
                <li className={style.navItem}>
                    <Link to="/new">New Todo List</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

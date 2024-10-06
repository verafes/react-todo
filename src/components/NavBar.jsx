import {Link} from 'react-router-dom';
import { useState } from 'react';
import style from './NavBar.module.css';
import HamburgerIcon from '../img/hamburger-menu.svg';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the menu state
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    // Collapse the menu when a link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    // Check if the screen width is mobile size
    const isMobile = window.innerWidth <= 768;

    return (
        <nav className={style.navBar}>
            {isMobile && (
                <img
                    src={HamburgerIcon}
                    alt="Menu"
                    className={style.hamburger}
                    onClick={toggleMenu}
                />
            )}
            <ul className={`${style.navList} ${isOpen ? style.open : ''}`}>
                <li className={style.navItem} onClick={handleLinkClick}>
                    <Link to="/">Home</Link>
                </li>
                <li className={style.navItem} onClick={handleLinkClick}>
                    <Link to="/mylists">My lists</Link>
                </li>
                <li className={style.navItem} onClick={handleLinkClick}>
                    <Link to="/new">New Todo List</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './NavBar.module.css';
import HamburgerIcon from '../img/hamburger-menu.svg';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Toggle the menu state
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    // Collapse the menu when a link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


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
            <ul className={`${style.navList} ${isOpen ? style.open : ''}`} >
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

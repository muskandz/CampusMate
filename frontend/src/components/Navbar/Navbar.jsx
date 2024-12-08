// src/components/Navbar/Navbar.jsx
import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { getImageUrl } from "../../utils";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src={getImageUrl("logo5_enhanced.png")} alt="logo"/>
                {/* <h1>College Portal</h1> */}
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="#features">Features</Link>
                </li>
                <li>
                    <Link to="#about">About Us</Link>
                </li>
                <li>
                    <Link to="#contact">Contact Us</Link>
                </li>
                <li>
                    <Link to="#feedback">Feedback</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
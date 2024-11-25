import React from 'react';
import styles from './Feature.module.css';

const Feature = ({ icon, title, description }) => {
    return (
        <li className={styles.featureItem}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.featureText}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </li>
    );
};

export default Feature;
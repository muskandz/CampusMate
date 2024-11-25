import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Feature from '../../components/Features/Feature';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.css';

import { FaCalendarAlt, FaFileAlt, FaChalkboardTeacher, FaStickyNote, FaCalendarCheck, FaUsers, FaChartLine } from 'react-icons/fa';

import featuresData from '../../data/features.json';

const iconMapping = {
    "Timetable Management": <FaCalendarAlt size={30} />,
    "Previous Year Papers": <FaFileAlt size={30} />,
    "Faculty Profiles": <FaChalkboardTeacher size={30} />,
    "Notes Repository": <FaStickyNote size={30} />,
    "Event Updates": <FaCalendarCheck size={30} />,
    "Attendance Tracking": <FaUsers size={30} />,
    "Results Overview": <FaChartLine size={30} />
};

const Home = () => {
    return (
        <div className={styles.home}>
            <Navbar />
            <Hero />
            <section className={styles.features}>
                <h2 id='features'>Key Features</h2>
                <ul className={styles.featureList}>
                    {featuresData.map((feature, index) => (
                        <li 
                            key={feature.title} 
                            className={`${styles.featureItem} ${index % 2 === 0 ? styles.left : styles.right}`}
                        >
                            <Feature 
                                icon={iconMapping[feature.title]} 
                                title={feature.title} 
                                description={feature.description} 
                            />
                        </li>
                    ))}
                </ul>
            </section>
            <section className={styles.feedbackSection}>
                <FeedbackForm />
            </section>
            <Footer/>
        </div>
    );
};

export default Home;
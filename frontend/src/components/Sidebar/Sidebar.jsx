import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

const Sidebar = ({ rollNumber, handleTimetableChange }) => {
    const [profile, setProfile] = useState({});
    const [todayClasses, setTodayClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch student profile
        axios.get(`http://localhost:5000/students/${rollNumber}/profile`)
            .then(response => setProfile(response.data.profile))
            .catch(error => console.error('Error fetching profile:', error));

        // Fetch today's classes
        axios.get(`http://localhost:5000/timetables/${rollNumber}/today`)
            .then(response => setTodayClasses(response.data))
            .catch(error => console.error('Error fetching today\'s classes:', error));
    }, [rollNumber]);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.profileSection}>
                <FaRegUserCircle size={80} className={styles.icon} />
                <p className={styles.name}><strong>{profile.name}</strong></p>
            </div>
            <h2>Profile</h2>
            <p><strong>Roll Number:</strong> {profile.rollNumber}</p>
            <p><strong>Course:</strong> {profile.course}</p>
            <p><strong>Specialization:</strong> {profile.specialization}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Semester:</strong> {profile.semester}</p>

            <h2>Today's Classes</h2>
            {todayClasses.length > 0 ? (
                <ul>
                    {todayClasses.map((entry, index) => (
                        <li key={index}>
                            <p><strong>{entry.subject_name}</strong></p>
                            <p>{entry.start_time} - {entry.end_time}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No classes scheduled for today.</p>
            )}

            <nav>
                <h2>Navigation</h2>
                <ul>
                    <li><a href="#" onClick={() => handleTimetableChange('timetable')}>Timetable</a></li>
                    <li><a href="/notes">Notes</a></li>
                    <li><a href="/attendance">Attendance</a></li>
                    <li><a href="/faculty-profiles">Faculty Profiles</a></li>
                </ul>
            </nav>

            <button onClick={handleBackClick}>Back</button>
        </div>
    );
};

export default Sidebar;
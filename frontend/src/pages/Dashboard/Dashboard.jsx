import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Timetable from '../../components/Timetable/Timetable';
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [selectedType, setSelectedType] = useState('today');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const rollNumber = localStorage.getItem('rollNumber');

    useEffect(() => {
        axios.get('http://localhost:5000/students/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, [rollNumber]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleTimetableChange = (type) => {
        setSelectedType(type);
    };

    return (
        <div className={styles.dashboard}>
            <Sidebar rollNumber={rollNumber} handleTimetableChange={handleTimetableChange} />
            <div className={styles.mainContent}>
                {selectedType === 'timetable' ? (
                    <>
                        <h2>Select Timetable Type</h2>
                        <div className={styles.timetableOptions}>
                            <button onClick={() => handleTimetableChange('regular')}>Regular Classes</button>
                            <button onClick={() => handleTimetableChange('unit_test')}>Unit Test Timetable</button>
                            <button onClick={() => handleTimetableChange('mid_sem')}>Mid-Sem Timetable</button>
                            <button onClick={() => handleTimetableChange('final_exam')}>Final Exam Timetable</button>
                        </div>
                    </>
                ) : selectedType !== 'today' && (
                    <>
                        <h2>Timetable</h2>
                        <Timetable rollNumber={rollNumber} selectedType={selectedType} />
                    </>
                )}
                <h2>Upcoming Events</h2>
                <div className={styles.events}>
                    {events.map(event => (
                        <div key={event.id} className={styles.eventCard}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
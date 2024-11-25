import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './Timetable.module.css';

const Timetable = ({ rollNumber, selectedType }) => {
    const [timetable, setTimetable] = useState([]);

    const lectureTimings = [
        { start_time: '09:10', end_time: '10:00' },
        { start_time: '10:00', end_time: '10:50' },
        { start_time: '10:50', end_time: '11:40' },
        { start_time: '11:40', end_time: '12:30' },
        { start_time: '13:05', end_time: '13:55' },
        { start_time: '13:55', end_time: '14:50' },
        { start_time: '14:50', end_time: '15:40' },
    ];

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchTimetable = (type) => {
            axios.get(`http://localhost:5000/timetables/${rollNumber}/${type}`)
                .then(response => setTimetable(response.data))
                .catch(error => console.error('Error fetching timetable:', error));
        };

        fetchTimetable(selectedType);
    }, [rollNumber, selectedType]);

    const renderTimetable = () => {
        if (selectedType === 'regular') {
            const groupedTimetable = timetable.reduce((acc, entry) => {
                if (!acc[entry.day_of_week]) acc[entry.day_of_week] = [];
                acc[entry.day_of_week][entry.lecture_number - 1] = entry.subject_name;
                return acc;
            }, {});

            Object.keys(groupedTimetable).forEach(day => {
                groupedTimetable[day] = Array(lectureTimings.length)
                    .fill(null)
                    .map((_, i) => groupedTimetable[day][i] || 'No Lecture');
            });

            return (
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            {lectureTimings.map((timing, index) => (
                                <th key={index}>
                                    {timing.start_time} - {timing.end_time}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedTimetable).map(([day, lectures]) => (
                            <tr key={day}>
                                <td className={styles.dayColumn}>{day}</td>
                                {lectures.map((subject, index) => (
                                    <td key={index}>{subject}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.map((entry, index) => (
                            <tr key={index}>
                                <td>{formatDate(entry.date)}</td>
                                <td>{entry.start_time}</td>
                                <td>{entry.end_time}</td>
                                <td>{entry.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    };

    return (
        <div className={styles.timetable}>
            {renderTimetable()}
        </div>
    );
};

Timetable.propTypes = {
    rollNumber: PropTypes.string.isRequired,
    selectedType: PropTypes.string.isRequired,
};

export default Timetable;
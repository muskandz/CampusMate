import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FacultyProfiles.module.css';

const FacultyProfiles = ({ rollNumber }) => {
    const [facultyData, setFacultyData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/faculty/student/${rollNumber}`)
            .then((response) => {
                setFacultyData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching faculty data:', error);
            });
    }, [rollNumber]);

    return (
        <div className={styles.facultyPage}>
            <h2>Faculty Teaching Your Subjects</h2>
            {facultyData.map((faculty, index) => (
                <div key={index} className={styles.facultyCard}>
                    <h3>{faculty.name}</h3>
                    <p><strong>Email:</strong> {faculty.email}</p>
                    <p><strong>Phone:</strong> {faculty.phone}</p>
                    <p><strong>Department:</strong> {faculty.department}</p>
                    <p><strong>Designation:</strong> {faculty.designation}</p>
                    <p><strong>Subject:</strong> {faculty.subject_name}</p>
                </div>
            ))}
        </div>
    );
};

export default FacultyProfiles;
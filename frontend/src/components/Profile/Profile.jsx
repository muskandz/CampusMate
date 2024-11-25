import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';

const Profile = ({rollNumber}) => {
    const [student, setStudent] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/student/profile/${rollNumber}`);
                setStudent(response.data.student);
            } catch(err) {
                setError(err.response?.data?.error || 'Failed to fetch profile information. ');
            }
        };
        fetchStudentDetails();
    }, [rollNumber]);

    if(error){
        return <p className={styles.error}>{error}</p>
    }
    if(!student){
        return <p>Loading...</p>;
    }

    return(
        <div className={styles.profile-container}>
            <h2>Profile Details</h2>
            <div className={styles.profile-details}>
                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Major/Stream:</strong> {student.major}</p>
                <p><strong>Semester:</strong> {student.semester}</p>
                <p><strong>Email:</strong> {student.email}</p>
            </div>
        </div>
    );
}

export default Profile;
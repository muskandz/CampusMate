// src/components/FeedbackForm/FeedbackForm.jsx
import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';

const FeedbackForm = () => {
    const [email, setEmail] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [className, setClassName] = useState('');
    const [feedbackText, setFeedbackText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to an API)
        console.log({ email, rollNumber, className, feedbackText });
        // Reset the form after submission
        setEmail('');
        setRollNumber('');
        setClassName('');
        setFeedbackText('');
        alert('Thank you for your feedback!');
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.textContainer}>
                <h2>We Value Your Feedback!</h2>
                <p>Your suggestions help us improve our website. Please share your thoughts below:</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Roll Number:
                    <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Class:
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Feedback:
                    <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
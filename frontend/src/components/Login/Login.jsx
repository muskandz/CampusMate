// LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/students/login', { rollNumber, password });
            localStorage.setItem('rollNumber', rollNumber); // Set rollNumber in localStorage
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Roll Number:</label>
                <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;

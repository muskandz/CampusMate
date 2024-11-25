const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
    const { rollNumber, password } = req.body; if (!rollNumber || !password) { return res.status(400).json({ error: 'Roll number and password are required!' }); }
    const query = 'SELECT * FROM students WHERE roll_number = ? AND password = ?';
    db.query(query, [rollNumber, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid roll number or password' });
        }
        const student = results[0];
        res.json({
            message: 'Login successful!', student: {
                rollNumber: student.roll_number,
                name: student.name,
                email: student.email,
                course: student.course,
                specialization: student.specialization,
                semester: student.semester,
            },
        });
    });

    router.get('/:rollNumber/profile', (req, res) => {
        const { rollNumber } = req.params;

        const query = 'SELECT * FROM students WHERE roll_number = ?';
        db.query(query, [rollNumber], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed', details: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }

            const student = results[0];
            res.json({
                message: 'Student profile fetched successfully!',
                profile: {
                    rollNumber: student.roll_number,
                    name: student.name,
                    email: student.email,
                    course: student.course,
                    specialization: student.specialization,
                    semester: student.semester,
                },
            });
        });
    });
});
router.get('/events', (req, res) => {
    const query = 'SELECT * FROM events'; // Assuming you have an events table 
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        res.json(results);
    });
});

router.put('/logout', (req, res) => {
    res.status({ message: 'Logout successful!' });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch faculty teaching in a specific class and section
router.get('/student/:rollNumber', (req, res) => {
    const { rollNumber } = req.params;
    const query = `
        SELECT faculty.name, faculty.email, faculty.phone, faculty.department, faculty.designation, subjects.subject_name
        FROM faculty_subjects
        JOIN faculty ON faculty_subjects.faculty_id = faculty.id
        JOIN subjects ON faculty_subjects.subject_id = subjects.id
        JOIN students ON students.semester = subjects.semester AND students.course = subjects.course AND students.specialization = subjects.specialization
        WHERE students.roll_number = ?`;
    db.query(query, [rollNumber], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No faculty found for this student' });
        }
        res.json(results);
    });
});

module.exports = router;
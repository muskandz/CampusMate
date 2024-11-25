const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch subjects
router.get('/subjects', (req, res) => {
    const { semester, course, specialization } = req.query;
    const query = `
        SELECT subject_code AS code, subject_name AS name
        FROM subjects
        WHERE semester = ? AND course = ? AND specialization = ?`;
    db.query(query, [semester, course, specialization], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        res.json(results);
    });
});

// Fetch notes for a specific subject and uploaded_by type
router.get('/fetch', (req, res) => {
    const { subject_code, uploadedBy } = req.query;
    const query = 'SELECT * FROM notes WHERE subject_code = ? AND uploaded_by = ?';
    db.query(query, [subject_code, uploadedBy], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No notes found for this subject' });
        }
        res.json({ notes: results.map((note) => ({
            id: note.id,
            title: note.title,
            fileContent: note.file_content.toString('base64'),
            uploadedBy: note.uploaded_by,
        })) });
    });
});

module.exports = router;
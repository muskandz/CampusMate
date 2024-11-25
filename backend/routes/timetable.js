const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/:rollNumber/regular', (req, res) => {
    const {rollNumber} = req.params;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long'});

    const query = 'SELECT course, specialization, section, semester FROM students WHERE roll_number = ?';
    db.query(query, [rollNumber], (err, results) => {
        if(err){
            return res.status(500).json({error: 'Database query failed', details: err});
        }
        if(results.length === 0){
            return res.status(404).json({error: 'Student not found'});
        }

        const {course, specialization, section, semester} = results[0];
        const queryTimetable = `SELECT day_of_week, lecture_number, subject_code, subject_name, start_time, end_time 
                                FROM timetable_regular 
                                WHERE course=? AND specialization=? AND section=? AND semester=? 
                                ORDER BY day_of_week, lecture_number`;
        db.query(queryTimetable, [course, specialization, section, semester], (err, results) => {
            if(err){
                return res.status(500).json({error: 'Database query failed', details: err});
            }
            res.json(results);
        });
    });
});

router.get('/:rollNumber/:type', (req, res) => {
    const { rollNumber, type } = req.params;

    const query = 'SELECT semester, specialization, course FROM students WHERE roll_number=?';
    db.query(query, [rollNumber], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const { semester, specialization, course } = results[0];
        const queryTimetable = `
            SELECT date, start_time, end_time, subject 
            FROM test_exam_timetables 
            WHERE semester = ? AND specialization = ? AND course = ? AND type = ? 
            ORDER BY date, start_time`;
        db.query(queryTimetable, [semester, specialization, course, type], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed', details: err });
            }
            res.json(results);
        });
    });
});

router.get('/:rollNumber/today', (req, res) => {
    const { rollNumber } = req.params;

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const query = 'SELECT course, specialization, section, semester FROM students WHERE roll_number = ?';

    db.query(query, [rollNumber], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const { course, specialization, section, semester } = results[0];
        const timetableQuery = `
            SELECT subject_name, start_time, end_time
            FROM timetable_regular
            WHERE course = ? AND specialization = ? AND section = ? AND semester = ? AND day_of_week = ?
            ORDER BY lecture_number`;

        db.query(timetableQuery, [course, specialization, section, semester, today], (err, classes) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed', details: err });
            }
            console.log("Classes fetched: ", classes);
            res.json(classes);
        });
    });
});
module.exports = router;
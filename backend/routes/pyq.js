const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/subjects/:rollNumber', (req, res) => {
    const { rollNumber } = req.params;
    const query = `SELECT subject.id`
})
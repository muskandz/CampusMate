const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const studentRoutes = require('./routes/student');
const timetableRoutes = require('./routes/timetable');
const notesRoutes = require('./routes/notes');
const facultyRoutes = require('./routes/faculty');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/students', studentRoutes);
app.use('/timetables', timetableRoutes);
app.use('/notes', notesRoutes);
// app.use('/attendance', attendanceRoutes);
app.use('/faculty', facultyRoutes);

app.get('/', (req, res) => {
    res.send("Campus mate backend with mysql is running");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
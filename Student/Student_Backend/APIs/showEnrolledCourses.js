const express = require('express')
const cors = require('cors')
require('../src/db/config')
const course = require('../src/models/course')
const student = require('../src/models/Student')
const app = express()
app.use(express.json())
app.use(cors())
const Jwt = require('jsonwebtoken')
const jwtKey = 'online-learning'

app.get('/showEndrolledCourses/:id', async (req, resp) => {
    try {
        let studentId = req.params.id;
        const stud = await student.findOne({_id:studentId})
        const studEnrolledCourse = stud.enrolledCourses
        console.log(studEnrolledCourse)
        resp.status(200).json(studEnrolledCourse)
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(4850, () => {
    console.log('Server is starting');
});
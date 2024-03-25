const express = require('express');
const cors = require('cors');
const student = require('../src/models/Student');
const course = require('../src/models/course');
require('../src/db/config');
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require('jsonwebtoken');
const jwtKey = 'online-learning';
const verify = require('../Middleware/verify');
const verifyToken = verify.verifyToken;

app.post("/unEnrollCourse/:id", async (req, res) => {
    const studentId = req.params.id;
    const courseId = req.body.courseId; 

    try {
        // Find the course by courseId
        const cour = await course.findById(courseId);
        if (!cour) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find the student by studentId
        const stud = await student.findById(studentId);
        if (!stud) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        // Unenroll the student from the course
        stud.enrolledCourses.pull(cour);
        await stud.save();

        // Respond with a success message
        res.status(200).json({ message: 'Course unenrolled successfully', updatedStudent: stud.enrolledCourses });
        console.log('Course unenrolled successfully');

    } catch (error) {
        console.error('Error unenrolling from the course:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.listen(4450, () => {
    console.log('Server is starting');
});
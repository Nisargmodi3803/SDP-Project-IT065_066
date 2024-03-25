const express = require('express');
const cors = require('cors');
const Student = require('../src/models/Student');
const Course = require('../src/models/course');
require('../src/db/config');
const app = express();
app.use(express.json());
app.use(cors());
const jwt = require('jsonwebtoken');
const jwtKey = 'online-learning';
const verify = require('../Middleware/verify');
const verifyToken = verify.verifyToken;
const PORT = 4400;

app.post("/enrollCourse/:id", async (req, res) => {
    const studentId = req.params.id;
    const courseId = req.body.courseId; 
    console.log(courseId);

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.enrolledCourses.push(course);
        await student.save();

        res.status(200).json({ message: 'Course enrolled successfully', updatedStudent: student.enrolledCourses });
        console.log(student.enrolledCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is Starting at ${PORT}`);
});

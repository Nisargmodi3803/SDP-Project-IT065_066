const express = require('express');
const cors = require('cors');
const Student = require('./src/models/Student');
const Course = require('./src/models/course');
require('./src/db/config');
const app = express();
app.use(express.json());
app.use(cors());
const jwt = require('jsonwebtoken');
const jwtKey = 'online-learning';
const verify = require('./Middleware/verify');
const verifyToken = verify.verifyToken;

app.post("/enrollCourse/:id", async (req, res) => {
    const studentId = req.params.id;
    const courseData = req.body;
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId }, 
            { $addToSet: { enrolledCourses: courseData } },
            { new: true }
        );
        res.status(200).json({ message: 'Course enrolled successfully', updatedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(4400, () => {
    console.log('Server is starting');
});

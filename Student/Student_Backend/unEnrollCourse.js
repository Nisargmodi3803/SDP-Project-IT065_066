const express = require('express');
const cors = require('cors');
const student = require('./src/models/Student');
const course = require('./src/models/course');
require('./src/db/config');
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require('jsonwebtoken');
const jwtKey = 'online-learning';
const verify = require('./Middleware/verify');
const verifyToken = verify.verifyToken;

app.post("/unEnrollCourse/:id", async (req, res) => {
    const studentId = req.params.id;
    const { courseId } = req.body; // Destructure courseId from the request body
    try {
        // Assuming courseId is a string
        const updatedStudent = await student.findOneAndUpdate(
            { _id: studentId },
            { $pull: { endrolledCourses: {_id:courseId } }}, // Pass courseId directly
            { new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(4450, () => {
    console.log('Server is starting');
});
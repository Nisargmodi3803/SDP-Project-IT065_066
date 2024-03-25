const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('./src/models/Student');
const Course = require('./src/models/course');
const verify = require('./Middleware/verify');

// Initialize Express app
const app = express();
const PORT = 5500;
const jwtKey = 'online-learning';

// Middleware
app.use(express.json());
app.use(cors());

// Database connection setup
require('./src/db/config');

// Authentication middleware
const verifyToken = verify.verifyToken;

// API routes

// Enroll a student in a course
app.post("/enrollCourse/:id", async (req, res) => {
    const studentId = req.params.id;
    const courseId = req.body.courseId;

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// User Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const stud = await Student.findOne({ email });
            if (stud && bcrypt.compareSync(password, stud.password)) {
                const token = jwt.sign({ stud }, jwtKey, { expiresIn: "2h" });
                res.status(200).json({ stud, auth: token });
            } else {
                res.status(404).json({ message: "Invalid email or password" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ message: "Email and password are required" });
    }
});

// User Registration
app.post("/register", async (req, res) => {
    const { name, email, password,phoneNo,city,state } = req.body;
    if (name && email && password) {
        try {
            let stud = new Student({ name, email, password: bcrypt.hashSync(password, 10), phoneNo,city,state });
            let result = await stud.save();
            result = result.toObject();
            delete result.password;
            const token = jwt.sign({ result }, jwtKey, { expiresIn: "2h" });
            res.status(201).json({ result, auth: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ message: "Name, email, and password are required" });
    }
});

// Show all courses
app.get('/showCourses', async (req, res) => {
    try {
        let courses = await Course.find();
        if (courses.length > 0) {
            res.status(200).json({ message: 'All Courses Display Successfully', courses });
        } else {
            res.status(404).json({ message: "No Courses Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Show enrolled courses for a student
app.get('/showEndrolledCourses/:id', async (req, resp) => {
    try {
        let studentId = req.params.id;
        const stud = await Student.findOne({_id:studentId})
        const studEnrolledCourse = stud.enrolledCourses
        console.log(studEnrolledCourse)
        resp.status(200).json(studEnrolledCourse)
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
});

// Unenroll a student from a course
app.post("/unEnrollCourse/:id", async (req, res) => {
    const studentId = req.params.id;
    const courseId = req.body.courseId;

    try {
        const cour = await Course.findById(courseId);
        if (!cour) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const stud = await Student.findById(studentId);
        if (!stud) {
            return res.status(404).json({ message: 'Student not found' });
        }

        stud.enrolledCourses.pull(cour);
        await stud.save();

        res.status(200).json({ message: 'Course unenrolled successfully', updatedStudent: stud.enrolledCourses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post("/searchCourse", async (req, resp) => {
    try {
        let cour = req.body;
        const courseData = await Course.find({ name: cour.name });
        if (courseData.length > 0) {
            resp.status(200).json({ message: "Course successfully found", courseData });
        } else {
            resp.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const course = require('./models/course');
const admin = require('./models/admin');

// Initialize Express app
const app = express();
const PORT = 5501;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection setup
require('./db/config');

// API routes

// Add a new course
app.post('/addCourse', async (req, res) => {
    try {
        let cour = new course(req.body);
        let result = await cour.save();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a course
app.delete("/deleteCourse/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await course.deleteOne({ _id: id });
        res.send(result);
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
            const adm = await admin.findOne({ email, password });
            if (adm) {
                res.status(200).json({ message: "Login successful", user: adm });
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

// Search for a course
app.post("/searchCourse", async (req, res) => {
    try {
        let cour = req.body;
        const courseData = await course.find({ name: cour.name });
        if (courseData.length > 0) {
            res.status(200).json({ message: "Course successfully found", courseData });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a course
app.put('/updateCourse/:id', async (req, res) => {
    const courseId = req.params.id;
    const updatedCourse = req.body;
    try {
        const result = await course.findOneAndUpdate(
            { _id: courseId },
            { $set: updatedCourse },
            { returnOriginal: false }
        );

        if (!result) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update course' });
    }
});

app.get('/showCourses', async (req, res) => {
    try {
        let courses = await course.find();
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

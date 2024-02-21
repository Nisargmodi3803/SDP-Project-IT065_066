const express = require('express');
const cors = require('cors');
const course = require('./models/course');
require('./db/config');

const app = express();

app.use(express.json());
app.use(cors());

const jwtKey = 'Admin-online-learning'; // You might use this key for JWT authentication if needed
const verfiy = require('./middleware/verify');
const verfiyToken = verfiy.verfiyToken; // This middleware might be used for JWT verification

app.post("/searchCourse", async (req, resp) => {
    try {
        let cour = req.body;
        const courseData = await course.find({ name: cour.name });
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

app.listen(4260, () => {
    console.log(`Server is starting`);
});

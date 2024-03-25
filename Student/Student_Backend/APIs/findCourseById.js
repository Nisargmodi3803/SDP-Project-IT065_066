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


app.get("/findCourse/:id", async (req, resp) => {
    try {
        const courseId = req.params.id;
        const courseData = await course.findOne({ _id:courseId })
        resp.status(200).json({ message: "Course Successfully found", courseData })
    }
    catch (error) {
        console.log(error)
        resp.status(500).json({ message: 'Internal Server Error' })
    }
})

app.listen(4800, () => {
    console.log(`Server is starting `);
});
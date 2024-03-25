const express = require('express')
const cors = require('cors')
require('../src/db/config')
const course = require('../src/models/course')
const app = express()
app.use(express.json())
app.use(cors())
const Jwt = require('jsonwebtoken')
const jwtKey = 'online-learning'

app.get('/showCourses', async (req, resp) => {
    try {
        let courses = await course.find();
        if (courses.length > 0) {
            resp.status(200).json({ message: 'All Courses Display Successfully', courses });
        } else {
            resp.status(404).json({ result: "No Courses Found" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(4200, () => {
    console.log('Server is starting');
});
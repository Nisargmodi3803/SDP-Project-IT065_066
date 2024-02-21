const express = require('express');
const cors = require('cors');
const course = require('./models/course');
require('./db/config');
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require('jsonwebtoken');
const jwtKey = 'online-learning';
const verfiy = require('./middleware/verify');
const verfiyToken = verfiy.verfiyToken;

app.put('/updateCourse/:id', async (req, res) => {
  const courseId = req.params.id;
  const updatedCourse = req.body;
  try {
    // Update the course in the database
    const result = await course.findOneAndUpdate(
      { _id: courseId },
      { $set: updatedCourse },
      { returnOriginal: false } // Return the updated document
    );

    if (!result) {
      // If course not found, return a 404 status code
      return res.status(404).json({ error: 'Course not found' });
    }

    // Send the updated course back as a response
    res.json(result);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

app.listen(4160, () => {
  console.log(`Server is starting`);
});

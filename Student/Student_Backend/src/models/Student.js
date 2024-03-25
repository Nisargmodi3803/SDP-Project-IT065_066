const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        name: String,
        phoneNo: String,
        city: String,
        state: String,
        image: String,
        enrolledCourses: [{
            name: String,
            link: String,
            image: String,
            description: String,
        }]
    }
)

module.exports = mongoose.model("Students", studentSchema)
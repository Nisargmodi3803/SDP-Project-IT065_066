const mongoose = require('mongoose')

const course = new mongoose.Schema({
    name:String,
    link:String,
    image:String,
    description:String
})

module.exports = mongoose.model("Courses", course)
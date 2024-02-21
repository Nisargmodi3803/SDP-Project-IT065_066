const mongoose = require('mongoose')

const course = mongoose.Schema({
    name:String,
    link:String,
    image:String,
    description:String
})

module.exports = mongoose.model("courses", course)
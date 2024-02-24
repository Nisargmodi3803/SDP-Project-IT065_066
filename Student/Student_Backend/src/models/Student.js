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
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'course'
        }]
    }
)

// studentSchema.pre("save",async function(next)
// {
//     if(this.isModified("password"))
//     {
//         this.password = await bcrypt.hash(this.password,10)
//     }

//     next()
// })

module.exports = mongoose.model("students", studentSchema)
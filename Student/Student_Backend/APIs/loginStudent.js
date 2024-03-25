const express = require('express')
const cors = require('cors')
const student = require('../src/models/Student')
require('../src/db/config')
const app = express()
app.use(express.json())
app.use(cors())
const Jwt = require('jsonwebtoken')
const jwtKey = 'online-learning'
const verfiy = require('../Middleware/verify')
const verfiyToken = verfiy.verfiyToken
const bcrypt = require('bcrypt')

app.post("/login", async (req, resp) => {
    if (req.body.email && req.body.password) {
        let stud = await student.findOne(req.body)
        if (stud) {
            Jwt.sign({ stud }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong,Please try after sometimes!!!" })
                }
                resp.send({ stud, auth: token })
            })
        }
        else {
            resp.send({ result: "No user found" })
        }
    }
    else {
        resp.send({ result: "No user found" })
    }

})

app.listen(5000, () => {
    console.log(`Server is starting `);
});
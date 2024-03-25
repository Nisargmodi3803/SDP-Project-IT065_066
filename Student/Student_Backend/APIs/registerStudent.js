const express = require('express')
const cors = require('cors')
require('../src/db/config')
const student = require('../src/models/Student')
const app = express()
app.use(express.json())
app.use(cors())
const Jwt = require('jsonwebtoken')
const jwtKey='online-learning'

app.post("/register",async (req,resp)=>
{
    let stud = new student(req.body)
    let result = await stud.save()
    result = result.toObject()
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong,Please try after sometimes!!!" })
        }
        resp.send({ result, auth: token })
    })
    resp.send(result)
})

app.listen(5500, () => {
    console.log(`Server is starting `);
  });
const express = require('express')
const cors = require('cors')
const course = require('../models/course')
require('../db/config')
const app = express()
app.use(express.json())
app.use(cors())
const Jwt = require('jsonwebtoken')
const jwtKey = 'Admin-online-learning'
const verfiy = require('../middleware/verify')
const verfiyToken = verfiy.verfiyToken

app.post('/addCourse',async (req,resp)=>{
    let cour = new course(req.body)
    let result = await cour.save()
    resp.send(result)
})

app.listen(4100, () => {
    console.log(`Server is starting `);
});
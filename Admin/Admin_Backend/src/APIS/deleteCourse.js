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

app.delete("/deleteCourse/:id",async (req,resp)=>{
    const id = req.params.id;
    const result = await course.deleteOne({_id:id})
    resp.send(result)
})

app.listen(4150, () => {
    console.log(`Server is starting `);
});
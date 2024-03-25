const express = require('express');
const cors = require('cors');
const Student = require('../src/models/Student');
const Course = require('../src/models/course');
require('../src/db/config');
const app = express();
app.use(express.json());
app.use(cors());
const jwt = require('jsonwebtoken');
const jwtKey = 'online-learning';
const verify = require('../Middleware/verify');
const verifyToken = verify.verifyToken;

app.post('/studentImage/:id',async (req,resp)=>{
    try {
        const studentId = req.params.id;
        const imageData = req.body;
        console.log(studentId)
        console.log(imageData)
        const imageAdd = await Student.findByIdAndUpdate(studentId,{$set:{image:imageData}},{new:true})

        if(!imageAdd)
            throw new Error({message : 'Student not found'})
        
        resp.status(200).send({message : 'Image Upload Successfully'})
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
})

app.listen(6000, () => {
    console.log(`Server is starting `);
  });
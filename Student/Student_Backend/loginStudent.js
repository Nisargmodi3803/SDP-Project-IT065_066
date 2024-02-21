const express = require('express')
const cors = require('cors')
const student = require('./src/models/Student')
require('./src/db/config')
const app = express()
app.use(express.json())
app.use(cors())
const Jwt = require('jsonwebtoken')
const jwtKey = 'online-learning'
const verfiy = require('./Middleware/verify')
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


/*
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ result: "Email and password are required" });
        }

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ result: "No user found" });
        }

        const passwordMatch = await bcrypt.compare(password, student.password);

        if (!passwordMatch) {
            return res.status(401).json({ result: "Invalid email or password" });
        }

        const token = Jwt.sign({ id: student._id }, jwtKey, { expiresIn: "2h" });
        res.status(200).json({ auth: token, student });

    } catch (error) {
        console.error(error);
        res.status(500).json({ result: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log('Server is starting');
});
*/

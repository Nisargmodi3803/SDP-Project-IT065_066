const express = require('express')
const cors = require('cors')
const admin = require('./models/admin')
require('./db/config')
const app = express()
app.use(express.json())
app.use(cors())
const Jwt = require('jsonwebtoken')
const jwtKey = 'Admin-online-learning'
const verfiy = require('./middleware/verify')
const verfiyToken = verfiy.verfiyToken

app.post("/login", async (req, resp) => {
    if (req.body.email && req.body.password) {
        let adm = await admin.findOne(req.body)
        if (adm) {
            Jwt.sign({ adm }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong,Please try after sometimes!!!" })
                }
                resp.send({ adm, auth: token })
            })
        }
        else {
            resp.send({ result: "No user found" })
        }
    }
    else {
        resp.send({ result: "No user found1" })
    }

})

app.listen(4000, () => {
    console.log(`Server is starting `);
});
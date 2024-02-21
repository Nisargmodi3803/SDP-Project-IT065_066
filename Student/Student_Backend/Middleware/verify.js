const Jwt = require('jsonwebtoken')
const jwtKey = 'online-learning'

function verfiyToken(req, resp, next) {
    let token = req.headers['']
    if (token) {
        let token = token.split(' ')[1]
        console.warn(token)
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err)
            {
                resp.status(401).send({result:"please provide valid token"})
            }
            else
            {
                next()
            }
        })
    }
    else {
        resp.status(403).send({result:"Please add token with response header"})
    }
}
var jwt = require('jsonwebtoken');
let privateKey = 'helloworld'

const verify = async (req, res, next) => {
    const token = req.headers["auth"]    
    jwt.verify(token, privateKey, (err, decoded)=> {
        if(err) {
            return res.status(401).send({
                "error": err
            })
        }
        req.id = decoded.id
        req.role = decoded.role
        next();
    });
}

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
         algorithm: 'HS256',
         expiresIn: "1d"
    });
}
module.exports = {
    verify,
    generateToken
}
const jwt = require('jsonwebtoken');

exports.createToken=(user)=>{
    return jwt.sign({user},'secretKey')
}
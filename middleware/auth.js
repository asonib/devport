const jwt = require('jsonwebtoken');
const key = require('../config/keys');

module.exports = (req, res, next) => {
    const token = req.header('auth');

    if(!token){
        return res.status(401).json({msg : 'User Not Authorized'});
    }

    try{
        const decode = jwt.verify(token, key.KeysAccess.jwtSecret);
        console.log(decode);
        req.user = decode.id;
        next();
    }catch(err){
        return res.status(401).json({msg : 'User Token not valid'});
    }
}
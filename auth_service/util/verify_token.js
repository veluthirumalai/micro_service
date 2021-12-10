const jwt = require('jsonwebtoken');
module.exports = function(req,res, next) {
    const bearerHeader = req.headers['authorization'];
    // console.log("bearerHeader", bearerHeader)
    
    if(typeof bearerHeader !== 'undefined') {    
    const bearer = bearerHeader.split(' ');    
    const bearerToken = bearer[1]; 
    try {
        const verify = jwt.verify(bearerToken, 'secretkey')
        // console.log("verify", verify)
        req.user = verify
        next();
    } catch (e) {
       res.status(403).send('Invalid token')
    }
    
    } else {
    // Forbidden
    res.status(403).send('Invalid token')
    }
}
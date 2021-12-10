const axios = require('axios');
const AuthService = "http://localhost:5000"
module.exports = function(req,res, next) {
   //console.log(JSON.stringify(req.headers));
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];    

        //console.log("`${AuthService}/verifyToken/${bearerToken}`", `${AuthService}/verifyToken/${bearerToken}`)

        axios.post(`${AuthService}/verifyToken/${bearerToken}`)
        .then(function (response) {
        //console.log(response.data);
        next()
        })
        .catch(function (error) {
        //console.log("error", error);
        res.status(403).send('Invalid Token')
        });
        
    } else {
        res.status(403).send('Authorization not Found')
    }    
}
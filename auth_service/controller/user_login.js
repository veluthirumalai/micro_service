const databaseConfig = require('../config/database.config');
var UserLogin = require('../models/login.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    console.log("test")
    res.send('Greetings from the Test controller!');
};

exports.user_create = function (req, res) {
     console.log("req.body.username", req.body.username)
    //if ((await UserLogin.countDocuments({})) === 0) {
        var user = new UserLogin(
                {
                    username: req.body.username,
                    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
                }
        );
        user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    //}      
};

exports.userauth = function (req, res) {   
    console.log("req.body.username", req.body.username)
    console.log("req.body.passwordHash", req.body.passwordHash)
    UserLogin.findOne({'username':req.body.username})
    .then(data => {
        if (!data || !bcrypt.compareSync(req.body.passwordHash, data.passwordHash)) {
            return res.status(404).send({
            message: 'Username or password is incorrect'
            });
        }
        console.log("data", data);
        jwt.sign({id : data.username}, 'secretkey', (err, token) => {
        res.header('authorization', token)
        return res.status(200).send({
            email:data.username,
            auth_token:token
        });
        });
    }).catch(err => {
        if(err) {
            console.log(err);
            return res.status(500).send({
                message: "User not found Error"
            });                
        }
    });
}

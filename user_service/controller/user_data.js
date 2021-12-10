const databaseConfig = require('../config/database.config');
var UserModel = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.user_create = function (req, res) {

    if(!req.body) {
        return res.status(400).send({
            message: "User Data content can not be empty"
        });
    }

    var user = new UserModel(
        {
            user_id: req.body.user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age
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
};

exports.get_userAll = (req, res) => {
    UserModel.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User."
        });
    });
};


exports.findOneUser = (req, res) => {
    UserModel.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};


exports.UserUpdate = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "User Body can not be empty"
        });
    }
   
    UserModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Users not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.id
        });
    });
};


exports.Userdelete = (req, res) => {
    UserModel.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });
};


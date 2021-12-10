var express = require('express');
var router = express.Router();
var verify = require('../util/verify_token');

var user_controller = require('../controller/user_data');


router.post('/create', verify,user_controller.user_create);

router.get('/getAll', verify,user_controller.get_userAll);

router.get('/findOne/:id', verify,user_controller.findOneUser);

router.put('/update/:id', verify,user_controller.UserUpdate);

router.delete('/remove/:id', verify,user_controller.Userdelete);



module.exports = router;
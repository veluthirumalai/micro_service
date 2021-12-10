var express = require('express');
var router = express.Router();

var user_data = require('../controller/user_login');
var verify = require('../util/verify_token');

router.post('/create', verify, user_data.user_create);
router.post('/auth', user_data.userauth);

module.exports = router;

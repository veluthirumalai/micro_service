var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({    
    user_id: {type: String, required: true, max: 100},
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: false},
    age: {type: String, required: false},
});


// Export the model
module.exports = mongoose.model('Users', UserSchema);
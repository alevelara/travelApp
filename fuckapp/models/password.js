// Use for Change Password

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passwordSchema = new Schema({
    password:{
        type: String,
        required: true
    }, 
    date_password_log:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('change_password', passwordSchema);

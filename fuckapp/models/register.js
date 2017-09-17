// Use for register.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//use Login
var registerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String, 
        required:  true
    },
    date_login:{
        type: Date,
        default: Date.now
    }
});

//Use if register fail. Check email
var emailSchema = new Schema({
    email:{
        type: String,
        required: true
    }, 
    date_login_fail:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('register', registerSchema);
module.exports = mongoose.model('email_register', emailSchema);

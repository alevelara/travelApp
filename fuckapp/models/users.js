//Use for add new users

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true,
        default:0
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String, //enum CORREGIR
        required: true
    },
    // Selected Interests by user
    interests: { 
        type: String,        
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String, 
        required:  true
    },
    phone_number:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date_log:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users',userSchema);

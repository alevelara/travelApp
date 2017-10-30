var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({    
    fieldname: {
        type: String, 
        required: true
    },
    originalname:{
        type: String, 
        required: true
    },
    encoding:{
        type: String, 
        required: true
    },
    mimetype:{
        type: String, 
        required: true
    },
    destination:{
        type: String, 
        required: true
    },
    filename:{
        type: String, 
        required: true
    },
    path:{
        type: String, 
        required: true
    },
    size:{
        type: Number, 
        required: true
    },
    profile:{
        type: Boolean,
        required: false,
        default: false
    },
    datelog: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Photo', PhotoSchema);
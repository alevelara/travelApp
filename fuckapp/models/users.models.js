//Modules
var crypto = require('crypto'),
    mongoose = require('mongoose');
    env_var = require('../config/var.json'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true        
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String, //enum CORREGIR
        required: false
    },
    // Selected Interests by user
    interests: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Interest',        
        required: false
    }],
    username:{
        type: String,
        required: false
    },
    password: {
        type: String, 
        required:  false
    },
    photo_id:{
        type:Schema.Types.ObjectId,
        ref: 'Photo',
        required: false
    },
    photo_profile_id:{
        type:Schema.Types.ObjectId,
        ref: 'Photo',
        required: false
    },
    phone_number:{
        type: Number,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    reset_password_token:{
        type: String, 
        required: false
    },
    date_log:{
        type: Date,
        default: Date.now
    },
    hash: String,
    salt: String

});

userSchema.methods.setPassword = function(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
  return this.hash === hash;
};

userSchema.methods.setInterests = function(interests){
   this.interests = interests;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, env_var.development.JWT_KEY); 
};




module.exports = mongoose.model('User',userSchema);


//Use for add new users
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var env_var = require('../config/var.json');
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
    phone_number:{
        type: Number,
        required: false
    },
    email:{
        type: String,
        required: true
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


userSchema.methods.verifyUser = function(req){
    var isUser = false;   
    if(!req.headers.authorization){        
            return isUser;
        }else{

            var token = req.headers.authorization.split(" ")[1];       
            jwt.verify(token, env_var.development.JWT_KEY, function(err, payload){        
                
                if(err){  
                    return isUser;
                }else{
                    if((payload.exp * 1000) <= Date.now()){             
                        return isUser;
                    }else{
                        isUser = true;
                        req.sub = payload;                       
                        return isUser;
                    }    
                }       
            });
            return isUser;
        }       
    };

module.exports = mongoose.model('User',userSchema);


//Use for add new users
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var env_var = require('../config/var.json')
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
    interests: { 
        type: String,        
        required: false
    },
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

userSchema.methods.setPassword = function set_password(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
  return this.hash === hash;
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


userSchema.methods.verifyUser = function(req, res){
    
        if(!req.headers.authorization){
            return res
            .status(403)
            .send({message: "Tu petición no tiene cabecera de autorización"});
        }
        var token = req.headers.authorization.split(" ")[1];
                
        jwt.verify(token, env_var.development.JWT_KEY, function(err, payload){
            console.log(payload);
            if(err){
                return res.status(403).send({                    
                    message: 'Fallo al autentificar el token.'
                });
            }else{
                if(payload.exp <= Date.now()){
                    return res
                    .status(401)
                    .send({message:"El token ha expirado"});
                }else{
                    
                    req.sub = payload;
                    return res.status(200).json({message:"token OK"});                    
                }    
            }       
        });
    };

module.exports = mongoose.model('User',userSchema);


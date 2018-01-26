const models = require('../../models');
const user = models.user;

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env_var = require('../../config/var.json');

exports.getUserByEmail = function(username, callback){
    console.log(username);
    user.findOne({email: username}, function(err, user){
        console.log(user);
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};

exports.generateJwt = function(user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: user.id,
        email: user.email,
        name: user.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, env_var.development.JWT_KEY);
};

exports.validPassword = function(password, user) {
    var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha256').toString('hex');
    return user.hash === hash;        
};
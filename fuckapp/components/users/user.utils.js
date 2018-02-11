
var generator = require('generate-password'),
    user = require('../../models/user'),
    text = require('body-parser');

const jwt = require('jsonwebtoken');
const env_var = require('../../config/var.json');

exports.generatePassword = function(pw, callback){
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    return callback(password);
};

exports.getUserByEmailAndToken = function(username, tokenPassword, callback){
    user.findOne({email: username, reset_password_token:tokenPassword}, function(err, user){
        if(err){
            return callback(err);
        }else{
            return callback(user);
        }
    });
};

exports.verifyUser = function(token, result){
    jwt.verify(token, env_var.development.JWT_KEY, function(err, payload){
        if(err){
            result.status = 404;
            result.message = 'Token not found';
            throw new Error(result.message);
        }else{
            var expiredTime = (payload.exp * 1000);
            if(expiredTime <= Date.now()){
                result.status = 401;
                result.message = "Token has expired";
                throw new Error(result.message);
            }else{
                result.payload = payload;
                result.status = 200;
            }
        }
    });
};



exports.validateUser = function(user) {
    return new Promise(function (fulfill, reject) {
        if (!user) {
            reject("User is null");
            return;
        }
        fulfill(user);
    });
};



var generator = require('generate-password'),
    user = require('../../models/user');
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
    if(token){                    
        jwt.verify(token, env_var.development.JWT_KEY, function(err, payload){
            if(err){
                result.status = 404
            }else{
                if((payload.exp * 1000) <= Date.now()){
                    result.status = 401
                }else{
                    result.payload = payload;
                    result.status = 200
                }
            }
        });
    }
};


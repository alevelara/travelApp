
var generator = require('generate-password'),
    user = require('../../models/user'),
    text = require('body-parser'),
     jwt = require('jsonwebtoken'),
    env_var = require('../../config/var.json');

exports.generatePassword = function(){
    return generator.generate({
        length: 10,
        numbers: true
    });
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

exports.validateUser = function(user) {
    return new Promise(function (fulfill, reject) {
        if (!user) {
            reject("User is null");
            return;
        }
        fulfill(user);
    });
};




var generator = require('generate-password'),
    user = require('../../models/user'),
    text = require('body-parser');

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

exports.validateUser = function(user) {
    return new Promise(function (fulfill, reject) {
        if (!user) {
            reject("User is null");
            return;
        }
        fulfill(user);
    });
};



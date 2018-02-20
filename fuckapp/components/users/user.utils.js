
const generator = require('generate-password'),
    user = require('../../models/user');

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



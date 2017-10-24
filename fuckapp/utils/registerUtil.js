var mongoose = require('mongoose'),
user = mongoose.model('User');

exports.check_username = function(username, callback){
    user.findOne({email: username}, function(err, user){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};

exports.check_username_and_token = function(username, key_password, callback){
    user.findOne({email: username, tokenForgottenPassword:key_password }, function(err, user){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};
var generator = require('generate-password');

exports.generatePassword = function(pw, callback){
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    console.log(password);    
    return callback(password);
};

exports.check_username_and_token = function(username, key_password, callback){
    user.findOne({email: username, tokenForgottenPassword:key_password}, function(err, user){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};
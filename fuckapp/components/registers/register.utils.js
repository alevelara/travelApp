var mongoose = require('mongoose'),
user = mongoose.model('User');

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


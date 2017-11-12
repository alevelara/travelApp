var mongoose = require('mongoose'),
user = mongoose.model('User');

exports.getUserByEmail = function(username, callback){
    user.findOne({email: username}, function(err, user){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};


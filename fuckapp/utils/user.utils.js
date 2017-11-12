var generator = require('generate-password'),
    mongoose = require('mongoose'),
    user = mongoose.model('User'),
    jwt = require('jsonwebtoken');

exports.generatePassword = function(pw, callback){
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    console.log(password);    
    return callback(password);
};

exports.getUserByEmailAndToken = function(username, tokenPassword, callback){
    user.findOne({email: username, reset_password_token:tokenPassword}, function(err, user){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};

exports.verifyUser = function(req, res){  
    if(!req.headers.auth_token){                 
        }else{
            var token = req.headers.auth_token;                   
            jwt.verify(token, env_var.development.JWT_KEY, function(err, payload){         
                if(err){                   
                   res.status(404);
                }else{
                    if((payload.exp * 1000) <= Date.now()){             
                        res.status(401);
                    }else{
                        req.sub = payload; 
                        res.status(200);                                                                      
                    }    
                }       
            });
        }       
    };


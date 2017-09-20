var mongoose = require('mongoose'),
 register = mongoose.model('register');
 user = mongoose.model('users');

 var mailCtrl = require('./mailerController');
 var error = require('../error');
//get user  
exports.login = function(req, res) {
    let email = req.body.email
    let password = req.body.password    
    user.findOne({email: email, password: password}, function(err, user){
        console.log(email);
        console.log(password);
        if (err){
            console.log('Login fail: date: %d', Date.now.toString());
            return res.json({error: err});     
            
        }else if(user == null){
            console.log('Incorrect user or password: date: %d', Date.now.toString());
           return res.json({status:'error', error_message:'Incorrect user or password'});
        }
        else            
            console.log('Login succes: name: %s password: %s - date: %d', email, password, Date.now.toString());
           return res.json({status:'success', session_info:{token:"super_secret_token"}});
    });
};

function check_username(username, callback){
    user.findOne({email: username}, function(err, user){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};

 exports.signup = function(req, res){
    var user_login = check_username(req.body.email, function(user_login){        
        if(user_login){
        console.log(user_login.email + " already exists. ");     
        res.json({status:"error", error_message: user_login.email + " already exists. "});
        }else{
            var newUser = new user(req.body);
            newUser.save(function(err, user){
            if(err){
               res.json({status:"error", error_message: err});
            }else{
                console.log("Login Succesful");                
                res.json({status:"success"});
                // After success login, we'll send a email verification          
                mailCtrl.sendEmail(user.email);
            }  
        });
    };

});
    
   

    
};


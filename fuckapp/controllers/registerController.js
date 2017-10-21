var passport = require('passport');
var mongoose = require('mongoose'),
 user = mongoose.model('User');

 var mailCtrl = require('./mailerController');
 var error = require('../error');
//get user  
exports.login = function(req, res) {

    passport.authenticate('local', function(err, user, info){
        var token;
        console.log(user);
         if (err){
            console.log('Login fail: date: %d', Date.now.toString());
            res.status(404).json({error: err})
            return;
         }
        if(!user){
            res.status(401).json(info);
            console.log('Incorrect user or password: date: %d', Date.now.toString());           
           return;
        }
        else{
            token = user.generateJwt();
            res.status(200);
            res.json({status:'success', session_info:{"token":token,user:{"email":user.email,"name":user.name}}});            
           // console.log('Login succes: name: %s password: %s - date: %d', email, password, Date.now.toString());
           return;
        }                   
    })(req,res);           
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
        return res.
        status(404)
        .json({status:"error", error_message: user_login.email + " already exists. "});
        }else{
            var newUser = new user();
            newUser.name = req.body.name;
            newUser.email = req.body.email;            
            newUser.setPassword(req.body.password);
            newUser.save(function(err, user){
            if(err){
               return res
               .status(500)
               .json({status:"error", error_message: err});
            }else{
                var token;
                token = newUser.generateJwt();
                
                console.log("Login Succesful"); 
                console.log(token);                                
                // After success login, we'll send a email verification          
                mailCtrl.sendEmail(user.email);
                return res.status(200).json({status:'success', session_info:{"token":token,user:{"email":user.email,"name":user.name}}});  
            }  
        });
    };

});
    
   

    
};


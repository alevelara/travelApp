//Modules
var passport = require('passport');
    
//Models
var mongoose = require('mongoose'),
    user = mongoose.model('User');

//Controllers
var mailCtrl = require('./mailer.controllers');

//Utils    
var util = require('../utils/register.utils');
    
exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info){
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
            res.json({status:'success', session_info:{"token":token,user:{"_id":user._id,"email":user.email,"name":user.name}}});            
            return;
        }                   
    })(req,res);           
};


 exports.signup = function(req, res){    
    var userLogin = util.getUserByEmail(req.body.email, function(userLogin){        
        if(userLogin){             
        return res.
        status(404)
        .json({status:"error", error_message: userLogin.email + " already exists. "});
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
                return res.status(200).json({status:'success', session_info:{"token":token,user:{"_id":user._id,"email":user.email,"name":user.name}}});  
            }  
        });
    };

});
    
   

    
};


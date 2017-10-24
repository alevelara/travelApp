var crypto = require('crypto');
var mongoose = require('mongoose'),
 user = mongoose.model('User');

var utilRegister = require('../utils/registerUtil');
var utilUser = require('../utils/userUtil');
var mailController = require('./mailerController');

exports.insert_user = function(req, res){
    var new_user = new user(req.body);
    new_user.setPassword(req.body.passoword);    
    new_user.save(function(err, user){
        if(err)
            res.send(err);
        var token;
        token = new_user.generateJwt();
        res.status(200);
        res.json({"token": token}, user);
    });
};

 exports.get_users = function(req,res){
     user.find({}, function(err, user){
        if (err)
            res.send(err);
        res.json({message: 'User succesfully added', user});        
     });
 };

 exports.get_user = function(req, res){    
     user.findById(req.params.userid, function(err, user){        
        if(err){
            res.status(401).json({message:"user fail"});
        }           
            res.status(200).json(user);
            
     });
 };

 exports.delete_user = function(req, res){    
     user.remove({_id: req.params.userid }, function(err, user){
        if(err)
            res.send(err);
        res.json({message: 'User succesfully deleted'});
     });
 };

 exports.update_user = function(req, res){
    user.findByIdAndUpdate({_id: req.params.userid}, req.body, {new: true}, function(err, user){
        if(err)
            res.send(err);
        res.json(user);
    });
 };

 exports.update_user_interests = function(req, res){ 
    var new_user = new user(user);
    var isUser = new_user.verifyUser(req);
     console.log(new_user.verifyUser(req));     
     if(isUser == true){
        user.findByIdAndUpdate(req.params.id, {interests:req.body.interests},function(err, user){
            if(err){
                return res
                .status(401)
                .json({message:"Error updating interests"});
            }else{
                console.log({message:"interests updates"})
                return res.status(200).json({message:"interests updates"});
            }
        });
    }else{
        return res.status(403).json({message:"invalid token"});
    }     
};


exports.get_user_interests = function(req, res){ 
    var new_user = new user(user);
    var isUser = new_user.verifyUser(req);
     console.log(new_user.verifyUser(req));     
        if (isUser == false) {
            return res.
            status(403).
            json({error_message:"invalid token"});
        } else {
         user.findOne({_id:req.params.id}).populate('interests').exec( function(err, user) {
            console.log(user);
            if (err) {
                return res
                .status(404)
                .json({status:"error", error_message: "Error retrieving user"});
            } else {
                console.log(user);
                return res.status(200).json({interests:user.interests})
            }
        });
    }
};

exports.send_email_password_user = function(req, res){
    console.log(req.body.email);
    var user_login = utilRegister.check_username(req.body.email, function(user_login){
        if(user_login){
            var password = utilUser.generatePassword(password, function(password){
                console.log(user_login._id);
                user.findByIdAndUpdate(user_login._id, {tokenForgottenPassword:password}, function(err, user){
                    if(err){
                        return res
                        .status(401)
                        .json({message_error:"Error updating token forgotten password: " + err.message});
                    }else{                         
                        mailController.sendNewPasswordEmail(req.body.email, password);
                        return res
                        .status(200)
                        .json({status:"success", message:"Your email has sended correctly."});
                    }
                });

            });
        }      
    });
};
  
exports.reset_password = function(req, res){
    var user_login = utilRegister.check_username_and_token(req.body.email,req.body.tokenForgottenPassword, function(user_login){        
        if(user_login){
            user_login.setPassword(req.body.new_password);
            user_login.save(function(err, user){
                if(err){
                    return res
                    .status(500)
                    .send({message:"Request error"});
                }else{
                    token = user_login.generateJwt();                    
                    return res.status(200).json({status:'success', session_info:{"token":token,user_login:{"_id":user_login._id,"email":user_login.email,"name":user_login.name}}});
            }
        });
    };
});  
};

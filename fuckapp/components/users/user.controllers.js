//modules
var crypto = require('crypto'),
    q = require('q');
//models
var mongoose = require('mongoose'),
    user = mongoose.model('User'),
    photo = mongoose.model('Photo');

//utils
var utilRegister = require('../registers/register.utils'),
    utilUser = require('./user.utils'),
    utilPhoto = require('../photos/photo.utils');

//controllers
var photoController = require('../photos/photo.controllers'),
    mailController = require('../mails/mailer.controllers');

exports.createUser = function(req, res){

}

exports.addUser = function(req, res){
    var newUser = new user(req.body);
    newUser.setPassword(req.body.password);    
    newUser.save(function(err, user){
        if(err)
            res.status(500).json({message_error: "BACKEND ERROR: "+ err.message});
        var token;
        token = newUser.generateJwt();
        res.status(200).json({"token": token, user:user});
    });
};

 exports.getUsers = function(req,res){
     user.find({}, function(err, user){
        if (err){
            res.status(500).json({message_error: "BACKEND ERROR: "+ err.message});
        }else{
            res.status(200).json({message: 'User succesfully added', user});      
        }          
     });
 };

 exports.getUser = function(req, res){
     utilUser.verifyUser(req,res);
     if(res.statusCode == 404){
        return res.
        status(404).
        json({error_message:"Token not found"});
     }else if(res.statusCode == 401){
        return res.
        status(401).
        json({error_message:"Token has expired"});
     }else if(res.statusCode == 200){          
        user.findById(req.sub._id, function(err, user){        
            if(err){
                res.status(404).json({message:"user fail"});
            }           
                res.status(200).json({"user": user});                
         });
     } 
    
 };

 exports.deleteUser = function(req, res){    
     user.remove({_id: req.params.userid }, function(err, user){
        if(err)
            res.send(err);
        res.json({message: 'User succesfully deleted'});
     });
 };

 exports.updateUser = function(req, res){
    user.findByIdAndUpdate({_id: req.params.userid}, req.body, {new: true}, function(err, user){
        if(err)
            res.send(err);
        res.json(user);
    });
 };

 exports.updateUserInterest = function(req, res){ 
    utilUser.verifyUser(req,res);
    if(res.statusCode == 404){
        return res.
        status(404).
        json({error_message:"Token not found"});
     }else if(res.statusCode == 401){
        return res.
        status(401).
        json({error_message:"Token has expired"});
     }else if(res.statusCode == 200){       
        user.findByIdAndUpdate(req.sub._id, {interests:req.body.interests},function(err, user){
            if(err){
                return res
                .status(401)
                .json({message:"Error updating interests"});
            }else{
                console.log({message:"interests updates"})
                return res.status(200).json({message:"interests updates"});
            }
        }); 
    }   
};

exports.getUserInterests = function(req, res){ 
    utilUser.verifyUser(req,res);
    if(res.statusCode == 404){
       return res.
       status(404).
       json({error_message:"Token not found"});
    }else if(res.statusCode == 401){
       return res.
       status(401).
       json({error_message:"Token has expired"});
    }else if(res.statusCode == 200){ 
         user.findOne({_id:req.sub._id}).populate('interests').exec( function(err, user) {
            if (err) {
                return res
                .status(404)
                .json({status:"error", error_message: "Error retrieving user"});
            } else {
                return res.status(200).json({interests:user.interests})
            }
        });
    }
};


exports.sendEmailUserPassword = function(req, res){    
    var userLogin = utilRegister.getUserByEmail(req.body.email, function(userLogin){
        if(userLogin){            
            var password = utilUser.generatePassword(password, function(password){                          
                user.findByIdAndUpdate(userLogin._id, {reset_password_token:password}, function(err, user){
                    if(err){
                        return res
                        .status(500)
                        .json({message_error:"Error updating token forgotten password: " + err.message});
                    }else{                         
                        mailController.sendNewPasswordEmail(req.body.email, password, res);
                        if (res.statusCode == 500){
                            return res
                            .json({message_error:"Error sending email: " + err.message});
                        }else if (res.statusCode == 200){
                            return res                            
                            .json({status:"success", message:"Your email has sended correctly."});
                        }
                       
                    }
                });
            });
        }else{
            res.status(401).json({message_error:"BACK ERROR"});
            console.log('Incorrect user: date: %d', Date.now.toString());           
           return;
        }      
    });
};

exports.resetPassword = function(req, res){
 
    var userLogin = utilUser.getUserByEmailAndToken(req.body.email, req.body.reset_password_token, function(userLogin){        
        if(userLogin){
            userLogin.setPassword(req.body.new_password);
            userLogin.save(function(err, user){
                if(err){
                    return res
                    .status(500)
                    .send({message:"Request error"});
                }else{
                    token = userLogin.generateJwt();                    
                    return res.status(200).json({status:'success', session_info:{"token":token,user:{"_id":userLogin._id,"email":userLogin.email,"name":userLogin.name}}});
                }
            });
        }else{
            return res
            .status(401)
            .json({message_error:"User doesn't exists"});
        }
    });  
};

exports.addUserPhotos = function(req, res){     
    utilUser.verifyUser(req,res);
    if(res.statusCode == 404){
       return res.
       status(404).
       json({error_message:"Token not found"});
    }else if(res.statusCode == 401){
       return res.
       status(401).
       json({error_message:"Token has expired"});
    }else if(res.statusCode == 200){                  
        var photoResult = photoController.addPhotos(req, res, function(result){            
            if (res.statusCode == 500){
                res.json({message_error:"Back ERROR: "+ err.message});
            }else if(res.statusCode == 200){               
                    user.findByIdAndUpdate(req.sub._id ,{$addToSet: {photoid: {$each: photoResult}}} ,function(err, user){
                        if(err){
                            return res.
                            status(500).
                            json({error_message:"error adding photo: "+ err.message});
                        }else{
                            return res
                            .status(200)
                            .json({message:"Successfully added photos"});
                        }
                    });            
            }
        });                        
    }
};

exports.addUserProfilePhoto = function(req, res){
    utilUser.verifyUser(req,res);
    
    if(res.statusCode == 404){
       
        return res.
       status(404).
       json({error_message:"Token not found"});
    
    }else if(res.statusCode == 401){
       
        return res.
       status(401).
       json({error_message:"Token has expired"});
    
    }else if(res.statusCode == 200){ 
        
        var photoResult = new photo(req.file);       
         
        photoController.addPhoto(req, res, function(photoResult){                 
            console.log(req.file);
            if (res.statusCode == 500){
                res.json({message_error:"Back ERROR: "+ err.message});
            }
            else if(res.statusCode == 200){
                
                user.findByIdAndUpdate(req.sub._id, { photo_profile_id: photoResult._id} ,function(err, user){
                    
                    if(err){
                        
                        return res.
                        status(500).
                        json({error_message:"error adding photo: "+ err.message});
                    
                    }else{
                        
                        return res
                        .status(200)
                        .json({message:"Successfully added photo"});
                    
                    }
                });
            }
        });        
    }
};


exports.getUserProfilePhoto = function(req, res){
    utilUser.verifyUser(req,res);
    if(res.statusCode == 404){
       return res.
       status(404).
       json({error_message:"Token not found"});
    }else if(res.statusCode == 401){
       return res.
       status(401).
       json({error_message:"Token has expired"});
    }else if(res.statusCode == 200){ 
        user.findOne({_id: req.sub._id}).populate('photo_profile_id').exec( function(err, user) {
            if (err) {
                return res
                .status(404)
                .json({status:"error", error_message: "Error retrieving user" + err.message});
            }else{
                return res
                .status(200)
                .json({message: user.photo_profile_id.path});
            }
        });
    }
}

//modules
var crypto = require('crypto'),
    q = require('q'),
    trys = require('bluebird'),
    logger = require('../../components/logger/logger');

//models
var models = require('../../models');
var User = models['user'];
var userRepository = require('./user.repository');

//utils
var utilRegister = require('../registers/register.utils'),
    utilUser = require('./user.utils'),
    utilPhoto = require('../photos/photo.utils');

//controllers
var photoController = require('../photos/photo.controller'),
    mailController = require('../mails/mailer.controllers');

// Get all users
exports.getAllUsers = function(req, res){
    var token = req.headers.auth_token;
    var userId = req.params.id;
    var result = {
        payload: null,
        status: 0,
        message: ""
    };
    try {
        utilUser.verifyUser(token,result);        
        try {
            userRepository.getAllUsers(function (users) {                 
                res.status(200).json({'users': users});    
            });               
        } catch (error) {
            res.status(500).json({err: 'Server Fail'})
        }
    } catch (error) {
        return res.status(result.status).json({error_message: error.message});
    }    
};

exports.getUser = function(req, res){
    
    var token = req.headers.auth_token;
    var userId = req.params.id;
    var result = {
        payload: null,
        status: 0,
        message: ""
    };

    try {
        utilUser.verifyUser(token,result);
        try {
            userRepository.findUserById(userId, function(user){                            
                if(user){
                    return res.status(200).json({"user": user});                
                }else{
                    return res.status(404).json({error_message: "user not found"});                
                }
             });
        } catch (error) {
            return res.status(500).json({error_message: error.message});
        }
    } catch (error) {
        return res.status(result.status).json({error_message: error.message});
    }    

};

 exports.updateUser = function(req, res){
    var token = req.headers.auth_token;
    var userId = req.params.id;
    var reqUser = req.body.user;
    var result = {
        payload: null,
        status: 0,
        message: ""
    };    
    try {
        utilUser.verifyUser(token,result);        
        try {
            userRepository.updateUserById(userId, reqUser, function(user){
                return res.status(200).json({user: user});
            });
        } catch (error) {
            return res.status(500).json({error_message: error.message});
        }
    } catch (error) {
        return res.status(result.status).json({error_message: error.message});
    }
   
};

 exports.updateUserInterest = function(req, res){ 
    var token = req.headers.auth_token;    
    var result = {
        payload: null,
        status: 0,
        message: ""
    };    
    try {
        utilUser.verifyUser(token, result);
            user.findByIdAndUpdate(result.payload.id, {interests:req.body.interests},function(err, user){
                if(err){
                    return res
                    .status(401)
                    .json({message:"Error updating interests"});
                }else{                
                    return res
                    .status(200)
                    .json({message:"interests updates"});
                }
            });     

    } catch (error) {
      
    }         
}; 

exports.getUserInterests = function(req, res){
    var token = req.headers.auth_token;
    var result = {
        payload: null,
        status: 0
    };
    utilUser.verifyUser(token, result);
    if(result.status == 404){
       return res.
       status(404).
       json({error_message:"Token not found"});
    }else if(result.status == 401){
       return res.
       status(401).
       json({error_message:"Token has expired"});
    }else if(result.status == 200){ 
         user.findOne({_id: result.payload.id}).populate('interests').exec( function(err, user) {
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
            logger.error('Incorrect user: date: %d', Date.now.toString());           
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
    var token = req.headers.auth_token;
    var result = {
        payload: null,
        status: 0
    };
    utilUser.verifyUser(token, result);
    if(result.status == 404){
       return res.
       status(404).
       json({error_message:"Token not found"});
    }else if(result.status == 401){
       return res.
       status(401).
       json({error_message:"Token has expired"});
    }else if(result.status == 200){                  
        var photoResult = photoController.addPhotos(req, res, function(result){            
            if (result.status == 500){
                res.json({message_error:"Back ERROR: "+ err.message});
            }else if(res.statusCode == 200){               
                    user.findByIdAndUpdate(result.payload.id ,{$addToSet: {photoid: {$each: photoResult}}} ,function(err, user){
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
    var token = req.headers.auth_token;
    var result = {
        payload: null,
        status: 0
    };
    utilUser.verifyUser(token, result);
    
    if(result.status == 404){
       
        return res.
       status(404).
       json({error_message:"Token not found"});
    
    }else if(result.status == 401){
       
        return res.
       status(401).
       json({error_message:"Token has expired"});
    
    }else if(result.status == 200){ 
        
        var photoResult = new photo(req.file);       
         
        photoController.addPhoto(req, res, function(photoResult){                 
            logger.debug(req.file);
            if (res.statusCode == 500){
                res.json({message_error:"Back ERROR: "+ err.message});
            }
            else if(res.statusCode == 200){
                
                user.findByIdAndUpdate(result.payload.id, { photo_profile_id: photoResult._id} ,function(err, user){
                    
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
    var token = req.headers.auth_token;
    var result = {
        payload: null,
        status: 0
    };
    utilUser.verifyUser(token, result);
    if(result.status == 404){
       return res.
       status(404).
       json({error_message:"Token not found"});
    }else if(result.status == 401){
       return res.
       status(401).
       json({error_message:"Token has expired"});
    }else if(result.status == 200){ 
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
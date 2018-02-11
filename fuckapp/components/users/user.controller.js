//controllers
const mailController = require('../mails/mailer.controllers');

//modules
const logger = require('../../components/logger/logger');

//repos
const userRepository = require('./user.repository');

//utils
const utilRegister = require('../registers/register.utils');
const utilUser = require('./user.utils');


// Get all users
exports.getAllUsers = function(req, res){
    try {
        userRepository.getAllUsers(function (users) {
            res.status(200).json({'users': users});
        });
    } catch (error) {
        res.status(500).json({err: 'Server Fail'})
    }
};


exports.getUser = function(req, res){
    const userId = req.params.id;

    userRepository
        .findUserById(userId)
        .then(user => {
            if (user) {
                res.status(200).json({user: user})
            } else {
                res.status(404).json({error_message: "user not found"})
            }
        })
        .catch(error => res.status(500).json({error_message: "Server error"}));
};

exports.updateUser = function(req, res) {
    const userId = req.params.id;
    const user = req.body.user;

    utilUser.validateUser(user)
        .then(user =>  userRepository.updateUserById(userId, user))
        .then(result => userRepository.findUserById(userId))
        .then(user => res.status(200).json({user: user}))
        .catch(error => res.status(500).json({error_message: error.message}));
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
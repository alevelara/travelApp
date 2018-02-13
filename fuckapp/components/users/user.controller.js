//controllers
const mailController = require('../mails/mailer.controllers');

//modules
const logger = require('../../components/logger/logger');

//repos
const userRepository = require('./user.repository');

//utils
const utilRegister = require('../registers/register.utils');
const utilUser = require('./user.utils');

const secureRequest = require('../../config/secureRequest');

const LIMIT_SEARCH_USER_BY_NAME = 20;

// Get all users
exports.getAllUsers = function(req, res){
    try {
        userRepository.getAllUsers(function (users) {
            res.status(200).json({'users': users});
        });
    } catch (error) {
        res.status(500).json({err: 'Server Fail'});
    }
};


exports.getUser = function(req, res){
    const userId = req.params.id;

    userRepository
        .findUserById(userId)
        .then(user => {
            if (user) {
                res.status(200).json({user: user});
            } else {
                res.status(404).json({error_message: "user not found"});
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

exports.searchByName = function(req, res){
    console.log("nombre de usuario "+name);  
    var name = req.body.name;
    var offset = req.body.offset;
    if(offset == null){
        offset = '0';
    }
    userRepository.matchUserByUserName(name, offset)
        .then(users => {
            offset = offset + LIMIT_SEARCH_USER_BY_NAME;
            res.status(200).json({user: users,offset:offset});
        });
};

exports.getUserInterests = function(req, res){  
    var userId = req.params.id;        
    userRepository.getInterestsByUserId(userId)
        .then(userinterests => res.status(200).json({"interests": userinterests}))      
        .catch (error => res.status(500).json({error_message: error.message}));

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
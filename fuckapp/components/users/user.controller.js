//controllers
const mailController = require('../mails/mailer.controllers');

//modules
const logger = require('../../components/logger/logger');

//repos
const userRepository = require('./user.repository');

//utils
const utilRegister = require('../registers/register.utils');
const utilUser = require('./user.utils');

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
        })
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
                return res.status(200).json({interests:user.interests});
            }
        });
    }
};

exports.sendEmailToUserWithResetPasswordToken = function(req, res){    
    userRepository.findUserByEmail(req.body.email)
    .then( user => {
        const resetPasswordtoken = utilUser.generatePassword()
        try{
            userRepository.updateUserResetPassWordTokenById(user.id, resetPasswordtoken)
        }catch(error){
            res.status(500).json({error_message: error.message});
        }
        try{
            mailController.sendNewPasswordEmail(req.body.email, password, res);
            return res.status(200).json({ status:"success", message:"Your email has sended correctly."});
        }catch(error){
            res.status(500).json({error_message: error.message});
        }
    });
};

exports.resetPassword = function(req, res){
    userRepository.findUserByEmailAndResetPasswordToken(req.body.email,req.body.reset_password_token)
    .then(user => {
        userRepository.updateUserPasswordById(user.id, req.body.new_password)
        .then(() => {res.status(200).json({user: user})})
        .catch(error => res.status(500).json({error_message: error.message}));
    }) 
    .catch(error => res.status(500).json({error_message: error.message}));
};
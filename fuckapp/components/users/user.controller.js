//controllers
const mailController = require('../mails/mailer.controllers');
//repos
const userRepository = require('./user.repository');
//utils
const utilUser = require('./user.utils');
const LIMIT_SEARCH_USER_BY_NAME = 20;

/**
 * Return all users in database
 *
 * @param req Request
 * @param res Response
 */
// Get all users
exports.getAllUsers = function(req, res){
        userRepository.getAllUsers()
        .then(users => res.status(200).json({'users': users}))
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "})
        });
};
/**
 * Return user filter by @param req.params.id
 *
 * @param req Request
 * @param res Response
 * @param req.params.id Id of user
 */
exports.getUser = function(req, res){
    const userId = req.params.id;

    userRepository.findUserById(userId)
        .then(user => {            
            if(user) {
                res.status(200).json({user: user});
            } else {                
                res.status(404).json({error_message: "user not found"});
            }
        }) 
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "})
        });
};

/**
 * Update user filtered by @param req.params.id
 *
 * @param req
 * @param res
 * @param req.params.id Id of user
 * @param req.body.user User
 */
exports.updateUser = function(req, res) {
    const userId = req.params.id;
    let user = req.body.user;

    utilUser.validateUser(user)
        .then(user => userRepository.updateUserById(userId, user))
        .then(updateUser => userRepository.findUserById(userId))
        .then(result => {res.status(200).json({user: result})})
        .catch((error) =>{
                console.log(error);
                res.status(500).json({error_message: "Server error "})
        });
};

/**
 * Return list of users matching in database by name passed in @param req.body.name
 *
 * @param req Request
 * @param res Response
 * @param req.body.name Filter
 * @param req.body.offset Offset of database
 */
exports.searchByName = function(req, res){
    const name = req.body.name;
    let offset = req.body.offset;

    console.log("nombre de usuario "+name);
    if(offset == null){
        offset = '0';
    }
    userRepository.matchUserByUserName(name, offset)
        .then(users => {
            offset = offset + LIMIT_SEARCH_USER_BY_NAME;
            res.status(200).json({users: users, offset:offset});
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "})
        });
};

exports.getUserInterests = function(req, res){  
    let userId = req.params.id;
    userRepository.getInterestsByUserId(userId)
        .then(userinterests => res.status(200).json({"interests": userinterests}))
            .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "})
            });
};

exports.getUserInterests = function(req, res){
    const token = req.headers.auth_token;
    let result = {
        payload: null,
        status: 0
    };
    utilUser.verifyUser(token, result);
    if(result.status === 404){
       return res.
       status(404).
       json({error_message:"Token not found"});
    }else if(result.status === 401){
       return res.
       status(401).
       json({error_message:"Token has expired"});
    }else if(result.status === 200){
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

/**
 * Send email to user filtered by @param req.body.email with the resetPasswordToken to recovery
 * password account
 *
 * @param req Request
 * @param res Response
 * @param req.body.email User email
 */
exports.sendEmailToUserWithResetPasswordToken = function(req, res){    
    userRepository.findUserByEmail(req.body.email)
    .then( user => {        
            if(!user){
                res.status(401).json({ error_message: "user not found"});
            }else{
            const resetPasswordtoken = utilUser.generatePassword();
            userRepository.updateUserResetPassWordTokenById(user.id, resetPasswordtoken)
            .then(user => {
                mailController.sendNewPasswordEmail(req.body.email, resetPasswordtoken);
                res.status(200).json({ status:"success", resetPasswordtoken: resetPasswordtoken});
            })
            .catch((error) =>{
                console.log(error);
                res.status(500).json({error_message: "Server error "})
            });                                
            }
        })
    .catch(error => res.status(500).json({error_message: error.message})); 
};


/**
 * Update password of user filtered by email
 *
 * @param req Request
 * @param res Response
 * @param req.body.email User email
 * @param req.body.reset_password_token Reset password token
 * @param req.body.new_password New password of user
 */
exports.resetPassword = function(req, res){
    userRepository.findUserByEmailAndResetPasswordToken(req.body.email,req.body.reset_password_token)
    .then(user => {
        userRepository.updateUserPasswordById(user.id, req.body.new_password)
        .then(() => {res.status(200).json({user: user})})
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
    });
};
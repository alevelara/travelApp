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
exports.getAllUsers = function(req, res){
    userRepository.getAllUsers()
        .then(users => res.status(200).json({'users': users}))
            .catch(() =>res.status(500).json({error_message: 'Server error '}));
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
            if (user) {
                res.status(200).json({user: user});
            } else {
                res.status(404).json({error_message: "user not found"});
            }
        }).catch(() => res.status(500).json({error_message: "Server error "}));
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
        .then(userRepository.findUserById(userId))
        .then(user => res.status(200).json({user: user}))
        .catch(() => res.status(500).json({error_message: "Server error "}))
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
            res.status(200).json({user: users,offset:offset});
        }).catch(() => res.status(500).json({error_message: "Server error "}));
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
        const resetPasswordtoken = utilUser.generatePassword();

        userRepository.updateUserResetPassWordTokenById(user.id, resetPasswordtoken);
        mailController.sendNewPasswordEmail(req.body.email, resetPasswordtoken, res);
    });
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
        .then(res.status(200).json({user: user}))
            .catch(() => res.status(500).json({error_message: "Server error "}))});
};
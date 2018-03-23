//Modules
const passport = require('passport'),
    userRepository = require('../users/user.repository');
    //mailCtrl = require('../mails/mailer.controllers');

//Utils
const registerUtil = require('./register.utils');

/**
 * Log in
 *
 * @param req Request
 * @param res Response
 */
exports.login = function(req, res) {

    passport.authenticate('local', function(err, user){
        if (err){
            console.error(err.message);
            res.status(500).json({error_message: "Server fail"});
            return;
        }
        else if(!user){
            res.status(401).json({error_message: "Incorrect user or password"});
        }else{
            let token = registerUtil.generateJwt(user);
        res.status(200).json({
            status:'success',
            session_info:{
                token:token,
                user: {
                    id:user.id,
                    email:user.email,
                    name:user.full_name
                }
            }});
        }
    })(req,res);
};

/**
 * Sing Up
 *
 * @param req Request
 * @param res Response
 */
exports.signup = function(req, res) {
    let newUser = {
        username: req.body.username,
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password
    };

    registerUtil.checkUserExists(newUser)
        .then(() => userRepository.createUser(newUser))
        .then(user => {
            console.log("New user created: " + user);
            if(!user){
                res.status(500).json({status:"error", error_message: "Server error "});
            } else {
                const token = registerUtil.generateJwt(user);
                // After success login, we'll send a email verification
                //mailCtrl.sendEmail(user.email);
                res.status(200).json( {
                    status:'success',
                    session_info: {
                        token:token,
                        user:user
                    }
                });
            }
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).json({error_message: "Server error "});
        });
};


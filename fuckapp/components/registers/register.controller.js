//Modules
var passport = require('passport'),
    userRepository = require('../users/user.repository'),
    logger = require('../../components/logger/logger');

//Controllers
var mailCtrl = require('../mails/mailer.controllers');

//Utils
var registerUtil = require('./register.utils');

exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info){
        if (!user){            
            logger.error('Login fail: date: %s', Date.now.toString());
            res.status(401).json({error_message: info.error_message});
            return;
        }
        var token = registerUtil.generateJwt(user);
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

    })(req,res);
};

exports.signup = function(req, res) {
    var newUser = {
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
                res.status(500).json({status:"error", error_message: "error creating user"});
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
        .catch(error => {
            console.error(error);
            res.status(400).json({status:"error", error_message: error});
        });
};


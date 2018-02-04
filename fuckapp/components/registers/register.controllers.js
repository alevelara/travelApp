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
        if (err){
            logger.error('Login fail: date: %d', Date.now.toString());
            res.status(500).json({error: err})
            return;
        }
        if(!user){
            res.status(401).json(info);
            logger.error('Incorrect user or password: date: %d', Date.now.toString());
            return;
        }
        else{
            token = registerUtil.generateJwt(user);
            res.status(200);
            res.json({status:'success', session_info:{"token":token, user:{"id":user.id,"email":user.email,"name":user.full_name}}});
            return;
        }
    })(req,res);
};


exports.signup = function(req, res){
    var userLogin = userRepository.findUserByEmail(req.body.email, function(user){
        logger.debug(user);
        if(user){
            return res.
            status(404)
                .json({status:"error", error_message: req.body.email + " already exists. "});
        } else {

            var queryUser = {
                 username: req.body.username,
                 full_name: req.body.full_name,
                 email: req.body.email,
                 password: req.body.password
            };           

            userRepository.createUser(queryUser, function(user){
                //logger.debug(user);
                if(!user){
                    return res
                        .status(500)
                        .json({status:"error", error_message: "error creating user"});
                }else{
                    const token = registerUtil.generateJwt(user);
                    // After success login, we'll send a email verification
                    mailCtrl.sendEmail(user.email);
                    return res.status(200).json({
                        status:'success',
                        session_info:{"token":token,
                            user:{
                            "id":user.id,
                                "email":user.email,
                                "name":user.full_name}
                        }});
                }
            })
        }
    });

};



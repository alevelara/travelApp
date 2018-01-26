//Modules
var passport = require('passport');
var userRepository = require('../users/user.repository')

//Controllers
var mailCtrl = require('../mails/mailer.controllers');

//Utils
var registerUtil = require('./register.utils');

exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info){
        if (err){
            console.log('Login fail: date: %d', Date.now.toString());
            res.status(404).json({error: err})
            return;
        }
        if(!user){
            res.status(401).json(info);
            console.log('Incorrect user or password: date: %d', Date.now.toString());
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
        if(user){
            return res.
            status(404)
                .json({status:"error", error_message: req.body.email + " already exists. "});
        } else {
            var fullName = req.body.fullname;
            var email = req.body.email;
            var password = req.body.password;

            userRepository.createUser(fullName, email, password, function(user){
                console.log(user);
                if(!user){
                    return res
                        .status(500)
                        .json({status:"error", error_message: err});
                }else{
                    const token = registerUtil.generateJwt(user);                    ;
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



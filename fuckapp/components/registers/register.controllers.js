//Modules
var passport = require('passport');

var userRepository = require('../users/user.repository')

//Controllers
var mailCtrl = require('../mails/mailer.controllers');

//Utils
var util = require('./register.utils');

const jwt = require('jsonwebtoken');
const env_var = require('../../config/var.json');

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
            token = user.generateJwt();
            res.status(200);
            res.json({status:'success', session_info:{"token":token,user:{"_id":user._id,"email":user.email,"name":user.name}}});
            return;
        }
    })(req,res);
};


exports.signup = function(req, res){
    var userLogin = userRepository.findUserByEmail(req.body.email, function(user){
        if(user){
            return res.
            status(404)
                .json({status:"error", error_message: userLogin.email + " already exists. "});
        } else {
            const fullName = req.body.fullname;
            const email = req.body.email;
            const password = req.body.password;
            userRepository.createUser(fullName, email, password, function(user, err){
                if(err){
                    return res
                        .status(500)
                        .json({status:"error", error_message: err});
                }else{
                    const token = generateJwt(user);

                    console.log("Login Succesful");
                    console.log(token);
                    // After success login, we'll send a email verification
                    mailCtrl.sendEmail(user.email);
                    return res.status(200).json({
                        status:'success',
                        session_info:{"token":token,
                            user:{
                            "_id":user._id,
                                "email":user.email,
                                "name":user.name}
                        }});
                }
            })
        }
    });

};

var generateJwt = function(user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: user.id,
        email: user.email,
        name: user.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, env_var.development.JWT_KEY);
};

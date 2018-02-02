const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');
const userRepository = require('../components/users/user.repository');
const models = require('../models');

const utilRegister = require('../components/registers/register.utils')

var User = models['user'];

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, done) {
    userRepository.findUserByEmail(username, function(user){        
        //User not found
        
        if(!user) {
            return done(null, false, {
                status:'error', error_message:'Incorrect user or password'
            });
        }
        //Wrong password        
        if(!utilRegister.validPassword(password, user)){
            return done( null, false,{
                status:'error', error_message:'Incorrect user or password'
            });
        }
        // LOGIN OK
        return done(null, user, {
            status:'success', session_info:{token:"super_secret_token"}
        });
    })
}

));


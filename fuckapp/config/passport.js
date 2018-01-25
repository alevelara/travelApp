var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');
var
    User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, done) {
    User.findOne({email: username}, function(err, user){
        //error
        if(err) {return done(err);}
        //User not found
        if(!user) {
            return done(null, false, {
                status:'error', error_message:'Incorrect user or password'
            });
        }
        //Wrong password
        if(!user.validPassword(password)){
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

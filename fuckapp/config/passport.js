const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const User = models['user'];
const utilRegister = require('../components/registers/register.utils')


passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(username, password, done) {
        User.findOne(
            {where:{email: username}},
            {role: 'admin'})
            .then(user => {
                if (!user) {
                    return done(null, false, {
                        status: 'error', error_message: 'Incorrect user or password'
                    });
                } else if (!utilRegister.validPassword(password, user)) {
                    return done(null, false, {
                        status: 'error', error_message: 'Incorrect user or password'
                    });
                }
                // LOGIN OK
                return done(null, user, {
                    status: 'success', session_info: {token: "super_secret_token"}
                });
            })
            .catch(error => console.error(error));
    })
);




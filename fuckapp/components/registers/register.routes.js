module.exports = function(app){

  //Controllers
    const login = require('./register.controller');

      app.route('/signup').post(login.signup);
      app.route('/login').post(login.login);
};

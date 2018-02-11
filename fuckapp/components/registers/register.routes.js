module.exports = function(app){
  //Modules
  var jwt = require('express-jwt'),
      var_env = require('../../config/var.json');
      
  //Controllers
  var login = require('./register.controller');

app.route('/signup')
  .post(login.signup);

app.route('/login')
  .post(login.login);

}

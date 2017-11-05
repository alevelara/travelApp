module.exports = function(app){
  var jwt = require('express-jwt');
  var login = require('../controllers/registerController');
  var var_env = require('../config/var.json');
 
  var auth = jwt({
    secret: var_env.development.JWT_KEY,
    userProperty: 'payload'
  });


app.route('/signup')
  .post(login.signup);

app.route('/login')
  .post(login.login);
}

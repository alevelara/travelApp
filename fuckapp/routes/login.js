module.exports = function(app){
  var login = require('../controllers/registerController');

app.route('/signup')
  .post(login.signup)

app.route('/login')
  .post(login.login)
}

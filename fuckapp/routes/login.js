module.exports = function(app){
  var login = require('../controllers/registerController');

app.route('/login')
  .get(login.get_user)
  .post(login.insert_login);
}

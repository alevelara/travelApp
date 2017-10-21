
module.exports = function(app){
var users = require('../controllers/userController');
var mongoose = require('mongoose'),
user = mongoose.model('User');

app.route('/users')
  .get(users.get_users)
  .post(users.insert_user);

app.route('/users/:userid')
  .get(users.get_user)
  //.put(users.update_user)

app.route('/delete/:userid')
  .delete(users.delete_user);

app.route('/user/:id/interests')
  .post(users.update_user_interests)
  .get(users.get_user_interests);

app.route('/user/:id/password')
  .get(users.forgotten_password);
}


module.exports = function(app){
var users = require('../controllers/userController');
var mongoose = require('mongoose'),
user = mongoose.model('User');

app.route('/users')
  .get(users.get_users)
  .post(users.insert_user);

app.route('/user/:userid')
  .get(users.get_user)
  .delete(users.delete_user);

app.route('/user/:id/interests')
  .post(users.update_user_interests)
  .get(users.get_user_interests);

app.route('/user/password')
  .post(users.send_email_password_user);

  app.route('/user/password/reset')
  .post(users.reset_password);

  app.route('/user/photo')
  .post(users.add_user_photo);
  //.get(users.get_user_photo);
}

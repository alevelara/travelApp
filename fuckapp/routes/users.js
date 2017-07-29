
module.exports = function(app){
  var users = require('../controllers/userController');

app.route('/users')
  .get(users.get_users)
  .post(users.insert_user);

app.route('/users/:userid')
  .get(users.get_user)
  //.put(users.update_user)

  app.route('/delete/:userid')
  .delete(users.delete_user);
}

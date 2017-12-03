
module.exports = function(app){
  //Models
  var mongoose = require('mongoose'),
      user = mongoose.model('User');


//Controllers
  var users = require('../controllers/user.controllers');
      

app.route('/users')
  .get(users.getUsers);
  
app.route('/user')
  .post(users.addUser)
  .get(users.getUser)
  .delete(users.deleteUser);

app.route('/user/interests')
  .post(users.updateUserInterest)
  .get(users.getUserInterests);

app.route('/user/password/recovery')
  .post(users.sendEmailUserPassword);

app.route('/user/password/reset')
  .post(users.resetPassword);

  /*app.route('/user/photos')
  .post(users.addUserPhotos);
  */

app.route('/user/photo/profile')
  .post(users.addUserProfilePhoto)
  .get(users.getUserProfilePhoto);
}

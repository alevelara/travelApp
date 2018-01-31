
module.exports = function(app){
  
//Controllers
  var users = require('./user.controller');
      

app.route('/users')
  .get(users.getAllUsers);
  
app.route('/user/:id')
  .get(users.getUser)  
  .put(users.updateUser);

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

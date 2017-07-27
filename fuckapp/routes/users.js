/*var express = require('express');
var router = express.Router();
/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/

module.exports = function(app){
  var users = require('../controllers/userController');

app.route('/users')
  .get(users.get_users)
  .post(users.insert_user);

app.route('/users/:userid')
  .get(users.get_user)
  .put(users.update_user)
  .delete(users.delete_user);
}

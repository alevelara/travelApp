module.exports = function(app){

    //Controllers
    var interests = require('../controllers/interest.controllers')

    app.route('/interests')
        .get(interests.getInterests);
     //   .post(interests.insert_interest)

}
module.exports = function(app){
    var interests = require('../controllers/interestsController')

    app.route('/interests')
        .get(interests.get_interests);
     //   .post(interests.insert_interest)

}
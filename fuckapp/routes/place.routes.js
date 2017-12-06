module.exports = function(app){

    var place = require('../controllers/place.controllers');

app.route('/places')
    .post(place.getPlacesByLocation);

}
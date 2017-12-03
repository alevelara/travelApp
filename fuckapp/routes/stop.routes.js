module.exports = function(app){

    var stop = require('../controllers/stop.controllers');

app.route('/stops')
    .get(stop.getStopsByLocation);



}
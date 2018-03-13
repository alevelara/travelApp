module.exports = function(app){
    //Controllers
    const googlePlaces = require('./googlePlaces.controller');

    app.get('/googlePlaces', googlePlaces.searchByName);
};
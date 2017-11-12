module.exports = function(app) {
    //Models        
    var mongoose = require('mongoose'),
    photo = mongoose.model('Photo');

    //Controllers
    var photos = require('../controllers/photo.controllers');

    app.route('/photo')
        .post(photos.addPhoto)
        .get(photos.getPhoto);

    app.route('/photo/:photoid')
        .get(photos.getPhoto)
        .delete(photos.deletePhoto);
}   
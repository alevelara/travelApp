module.exports = function(app) {
    //Models        
    var mongoose = require('mongoose'),
    photo = mongoose.model('Photo');

    //Controllers
    var photos = require('../controllers/photo.controllers');

    app.route('/photos')
        .post(photos.addPhoto)
        .get(photos.getPhotos);

    app.route('/photo/:photoid')
        .get(photos.getPhoto)
        .delete(photos.deletePhoto);
}   
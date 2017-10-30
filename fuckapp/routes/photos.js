module.exports = function(app) {        
    var mongoose = require('mongoose'),
    photo = mongoose.model('Photo');

    var photos = require('../controllers/photoController');

    app.route('/photos')
        .post(photos.add_photo)
        .get(photos.get_photos);

    app.route('/photo/:photoid')
        .get(photos.get_photo)
        .delete(photos.delete_photo);
}   
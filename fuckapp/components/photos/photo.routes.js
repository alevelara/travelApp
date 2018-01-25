module.exports = function(app) {
 //Controllers
    var photos = require('./photo.controllers');

    app.route('/photo')
        .post(photos.addSimplePhoto)
        .get(photos.getPhoto);

    app.route('/photo/:photoid')
        .get(photos.getPhoto)
        .delete(photos.deletePhoto);
}   
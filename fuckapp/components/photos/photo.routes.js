const photoController = require('./photo.controller');
const uploadAvatar = require('./photo.utils').uploadAvatar();


module.exports = function(app) {

    app.post('/photo', uploadAvatar, function(req, res) {
        photoController.addSimplePhoto(req, res)
    });

    app.get('/photo/:id', photoController.getPhoto);
};

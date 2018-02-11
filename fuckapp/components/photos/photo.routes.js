'use strict';

const photoController = require('./photo.controller');
const uploadSinglePhoto = require('./photo.utils').uploadSinglePhoto();


module.exports = function(app) {

    app.post('/photo', uploadSinglePhoto, photoController.savePhoto);

    app.get('/photo/:id', photoController.getPhoto);
};

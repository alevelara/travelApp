'use strict';

const models = require('../../models');
const Photo = models['photo'];

exports.savePhoto = function (photo, callback) {
    Photo.create(
        {
            field_name: photo.field_name,
            original_name: photo.original_name,
            encoding: photo.encoding,
            mime_type: photo.mime_type,
            destination: photo.destination,
            file_name: photo.file_name,
            path: photo.path,
            size: photo.size
        }
    ).then(photo => callback(photo))
        .catch(error => {
            console.log(error);
            callback()
        })
};

exports.findPhotoById = function (photoId, callback) {
    Photo.findOne({where: {id: photoId}})
        .then(photo => callback(photo))
        .catch(error => callback())
};
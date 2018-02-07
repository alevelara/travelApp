'use strict';

const models = require('../../models');
const Photo = models['photo'];

exports.savePhoto = function (photo) {
    return new Promise(function (fulfill, reject) {
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
        ).then(photo => fulfill(photo))
            .catch(error => reject(error))
    })

};

exports.findPhotoById = function (photoId) {
    return new Promise(function (fulfill, reject) {
        Photo.findOne({
            where: {id: photoId}
        }).then(photo => fulfill(photo))
            .catch(error => reject(error))
    })

};
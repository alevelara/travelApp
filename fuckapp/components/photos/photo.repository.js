'use strict';

const models = require('../../models');
const Photo = models['photo'];

exports.savePhoto = function (photo) {
    return Photo.create(
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
    )
};

exports.findPhotoById = function (photoId) {
    return Photo.findOne({where: {id: photoId}})
};
'use strict';

const models = require('../../models');
const Photo = models['photo'];

/**
 * Create photo in database
 *
 * @param photo Photo to create
 */
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
    );
};

/**
 * Get photo filtered by @param photoId
 *
 * @param photoId PhotoId for filter
 * @returns {Query|Promise|Promise<Model>|void|*}
 */
exports.findPhotoByUuid = function (photoUUid) {
    return Photo.findOne({where: {uuid: photoUUid}})
};
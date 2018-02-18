'use strict';

const fs = require('fs');
const photoRepository = require('./photo.repository');
const Promise = require('promise');

/**
 * Create photo
 *
 * @param req Request
 * @param res Response
 */
exports.savePhoto = function (req, res) {
    module.exports.savePhotoFile(req.file)
        .then(photo => res.status(200).json({photo_id: photo.id}))
        .catch(error => {
            console.error(error);
            res.status(500).json({error_message: "Error saving photo"})});
};

/**
 * Get Photo filterd by photo id
 *
 * @param req Request
 * @param res Response
 * @param req.params.id Id for filter photo
 */
exports.getPhoto = function(req, res) {
    const photoId = req.params.id;

    photoRepository
        .findPhotoById(photoId)
        .then(photo => {
            const path = photo.path;

            if (isValidPath(path)) {
                addContentResponseHeaders(photo, res);
                fs.createReadStream(path).pipe(res);
            }
        })
        .catch(() =>
            res.status(404).json({error_message: `Photo with id ${photoId} not found`}));
};

/**
 * Save photo and validate
 *
 * @param photo Photo for save
 * @returns {*|Promise}
 */
exports.savePhotoFile = function(photo) {
    return new Promise(function(fulfill, reject) {
        validatePhotoPromise(photo)
            .then(() => photoRepository.savePhoto(sanitizePhoto(photo)))
            .then(savedPhoto => fulfill(savedPhoto))
            .catch(error => {
                console.log(error);
                reject(error);
            });
    })
};

/**
 * Validate Photo
 *
 * @param file
 * @returns {*|Promise}
 */
function validatePhotoPromise(file) {
    return new Promise(function(fulfill, reject) {
        if (!file) {
            reject("File is null");
            return;
        }
        if (!file.hasOwnProperty('fieldname')
            || !file.hasOwnProperty('originalname')
            || !file.hasOwnProperty('encoding')
            || !file.hasOwnProperty('mimetype')
            || !file.hasOwnProperty('destination')
            || !file.hasOwnProperty('filename')
            || !file.hasOwnProperty('path')
            || !file.hasOwnProperty('size')) {
            reject("Invalid file");
        }
        if (!file.mimetype.startsWith("image/")) {
            reject("Invalid mime-type: " + file.mimetype);
        }
        fulfill(true)
    })
}

/**
 * Function to compose the photo entity in database
 *
 * @param file File
 * @returns {{field_name: *, original_name, encoding, mime_type, destination: *|photo.destination|{type, allowNull}|RequestDestination|AudioDestinationNode, file_name, path, size}}
 */
function sanitizePhoto(file) {
    return {
        field_name: file.fieldname,
        original_name: file.originalname,
        encoding: file.encoding,
        mime_type: file.mimetype,
        destination: file.destination,
        file_name: file.filename,
        path: file.path,
        size: file.size
    };
}

/**
 * Validate Path of photo
 *
 * @param path Path to validate
 * @returns {boolean}
 */
function isValidPath(path) {
    return path !== null && fs.existsSync(path);
}

/**
 * Function to add headers to response
 *
 * @param photo Photo
 * @param res Response
 */
function addContentResponseHeaders(photo, res) {
    res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + photo.file_name
    });
}

const fs = require('fs');
const photoRepository = require('./photo.repository');
const Promise = require('promise');


exports.savePhoto = function (req, res) {
    savePhoto(req.file)
        .then(photo => res.status(200).json({photo_id: photo.id}))
        .catch(error => {
            console.error(error);
            res.status(500).json({error_message: "Error saving photo"})
        })
};

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

function savePhoto(photo) {
    return new Promise(function(fulfill, reject) {
        validatePhotoPromise(photo)
            .then(() => photoRepository.savePhoto(sanitizePhoto(photo)))
            .then(savedPhoto => fulfill(savedPhoto))
            .catch(error => reject(error));
    })
}

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

function isValidPath(path) {
    return path !== null && fs.existsSync(path);
}

function addContentResponseHeaders(photo, res) {
    res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + photo.file_name
    });
}

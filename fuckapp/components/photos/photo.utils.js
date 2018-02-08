//Modules
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const config = require('../../config/config');
const env = process.env.NODE_ENV;


const STORAGE = multer.diskStorage({
    destination: config.get('storage:' + env + ':uploads_path'),
    filename: function(req, file, callback) {
        // This will encrypt the filename of the uploads
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);

            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }        
});


exports.uploadSinglePhoto = function(){
    return multer({storage: STORAGE}).single("photo");
};

exports.uploadMultiplePhotos = function(){
    var upload = multer({storage: STORAGE}).array("photo_multiple",10);
    return upload;
};

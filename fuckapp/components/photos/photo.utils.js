//Modules
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

//TODO: Move destination to config file
const STORAGE = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);

            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }        
});

exports.uploadAvatar = function(){
    return multer({storage: STORAGE}).single("file");
};

 
exports.uploadMultiplePhotos = function(){
    var upload = multer({storage: STORAGE}).array("img",10);
    return upload;
};

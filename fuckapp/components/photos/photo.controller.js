const fs = require('fs');
const photoRepository = require('./photo.repository');

//Utils
var photoUtil = require('./photo.utils');


exports.addSimplePhoto = function(req, res) {

    /*photoUtil.uploadAvatar(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({error_message:"Error saving file"});
        }else{

        }
    });*/

    if (!req.file) {
        console.log("No file received");
        res.status(400).json({error_message: "No file received"});
        return;
    }
    console.log(req.file);
    var newPhoto = {
        field_name: req.file.fieldname,
        original_name: req.file.filename,
        encoding: req.file.encoding,
        mime_type: req.file.mimetype,
        destination: req.file.destination,
        file_name: req.file.filename,
        path: req.file.path,
        size: req.file.size
    };

    photoRepository.savePhoto(newPhoto, function(photo) {
        if (photo) {
            return res.status(200).json({photo_id: photo.id});
        } else {
            return res.status(500).json({error_message:"Error saving photo"});
        }
    })
};

exports.getPhoto = function(req, res){
    var photoId = req.params.id;

    photoRepository.findPhotoById(photoId, function(photo) {
        console.log(photo);
        if (!photo) {
            return res.status(404).json({error_message: `Photo with id ${photoId} not found`});
        }
        const path = photo.path;

        fs.exists(path, function(exists){
            if (exists) {
                // Content-type is very interesting part that guarantee that
                // Web browser will handle response in an appropriate manner.
                res.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + photo.file_name
                });
                fs.createReadStream(path).pipe(res);
            } else {
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("ERROR File does not exist");
            }
        });
    })
};


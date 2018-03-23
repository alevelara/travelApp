const fs = require('fs');
const photoController = require('../components/photos/photo.controller');
const path = __dirname + "/photos";

fs.readdir(path, function(err, items) {
    for (var i=0; i<items.length; i++) {
        const file = items[i];

        console.log(file);

        const newFile = {            
            fieldname: file,
            originalname: file,
            encoding: "16b",
            mimetype: "image/jpg",
            destination: path + '/' + file,
            filename: file,
            path: path + '/' + file,
            size: 10
        };

        console.log(newFile);
        
        photoController.savePhotoFile(newFile)
            .then(savedPhoto => console.log("Created Photo: " + savedPhoto))
            .catch(error => console.log(error));
    }
});


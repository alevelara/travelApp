var multer = require('multer');

exports.addPhoto = function(req){    
    var store = multer.diskStorage({        
        destination: function(req, file, callback) {        
            callback(null, "./uploads");        
        },                     
        filename: function(req, file, callback) {                
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);        
        }        
    });    
    var upload = multer({storage: store}).single("img");    
    return upload;
};

 
exports.addMultiplePhotos = function(req){    
    var store = multer.diskStorage({        
        destination: function(req, file, callback) {        
            callback(null, "./uploads");        
        },                     
        filename: function(req, file, callback) {                
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);        
        }        
    });    
    var upload = multer({storage: store}).array("img",10);    
    return upload;
};

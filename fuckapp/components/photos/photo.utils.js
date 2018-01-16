//Modules
var multer = require('multer');

var STORE = multer.diskStorage({        
    destination: function(req, file, callback) {        
        callback(null, "./uploads");        
    },                     
    filename: function(req, file, callback) {                
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);        
    }        
});

exports.uploadPhoto = function(req){            
    var upload = multer({storage: STORE}).single("img");    
    return upload;
};

 
exports.uploadMultiplePhotos = function(req){    
     
    var upload = multer({storage: STORE}).array("img",10);    
    return upload;
};

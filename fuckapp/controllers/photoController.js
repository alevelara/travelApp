
var fs = require('fs');

var mongoose = require('mongoose'),
photo = mongoose.model('Photo');

var photoUtil = require('../utils/photUtil');

exports.add_photo = function(req, res, result_photo){    
    
    var upload = photoUtil.addPhoto(req);
    upload(req, res, function(err) {        
                 if (err) {        
                     res.end(err.message);
                     console.log(1);        
                 }else{
                    var new_photo = new photo(req.file);         
                    new_photo.save(function(err, photo){
                        if(err){
                            res.status(500);
                            console.log(2);
                        }else{
                            res.status(200);
                            console.log(new_photo);
                            result_photo = new_photo;
                        }
                    });           
                 }   
             });            
};

exports.get_photos = function(req, res){
    photo.find({},function(err, photo){
        if(err){
            return res.status(500).json({message_error: "Back Error"+ err.message})
        }else{
            return res.status(200).json({photos:photo})
        }
    });
};

exports.get_photo = function(req, res){
    photo.findById(req.params.photoid, function(err, photo){
        if(err){
            return res.status(500).json({message_error: "Back Error"+ err.message})
        }else{
            return res.status(200).json({photo:photo})
        }
    });
};

exports.delete_photo = function(req,res){
    photo.findByIdAndRemove(req.params.photoid, function(err, photo){
        if(err){
            return res.status(500).json({message_error: "Back Error"+ err.message})
        }else{
            return res.status(200).json({photo: photo, message: "photo delete correctly"});
        }
    });
};
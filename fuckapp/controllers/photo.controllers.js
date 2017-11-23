//Modules
var fs = require('fs'),
    q = require('q');

//Models    
var mongoose = require('mongoose'),
    photo = mongoose.model('Photo');

//Utils
var photoUtil = require('../utils/photo.utils');


exports.addSimplePhoto = function(req, res, callback){        
    var upload = photoUtil.uploadPhoto(req);
    upload(req, res, function(err) {        
                 if (err) {        
                     res.end(err.message);
                 }else{
                    var newPhoto = new photo(req.file);         
                    newPhoto.save(function(err, photo){
                        if(err){
                            res.status(500).json({message_error:"BACKEND ERROR: "+ err.message});
                        }else{
                            res.status(200).json({photo_id:newPhoto._id});                            
                        }
                    });           
                 }   
             });            
};

exports.addPhoto = function(req, res, callback){        
    var upload = photoUtil.uploadPhoto(req);
    upload(req, res, function(err) {        
                 if (err) {        
                     res.end(err.message);
                 }else{
                    var newPhoto = new photo(req.file);    
                    newPhoto.save(function(err, photo){
                        if(err){
                            res.status(500);
                        }else{
                            res.status(200);
                            callback(newPhoto);
                        }
                    });           
                 }   
             });            
};

exports.addPhotos = function(req, res, callback){
    
    var upload = photoUtil.uploadMultiplePhotos(req),
    result = {};    
    upload(req, res, function(err) {        
                 if (err) {        
                     res.end(err.message);
                     deferred.reject(err.message);                           
                 }else{                                                             
                        result = photo.insertMany(req.files, function(err, photo){
                            if(err){
                                res.status(500);
                            }else{
                                res.status(200);  
                                callback(result);                                                                
                            }
                        });                       
                }
                
            });
        };

exports.getPhotos = function(req, res){
    photo.find({},function(err, photo){
        if(err){
            return res.status(500).json({message_error: "Back Error"+ err.message})
        }else{
            return res.status(200).json({photos:photo})
        }
    });
};

exports.getPhoto = function(req, res){
    photo.findById(req.params.photoid, function(err, photo){
        if(err){
            return res.status(500).json({message_error: "Back Error"+ err.message})
        }else{
            return res.status(200).json({photo:photo})
        }
    });
};

exports.deletePhoto = function(req,res){
    photo.findByIdAndRemove(req.params.photoid, function(err, photo){
        if(err){
            return res.status(500).json({message_error: "Back Error"+ err.message})
        }else{
            return res.status(200).json({photo: photo, message: "photo delete correctly"});
        }
    });
};
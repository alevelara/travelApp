    //Modules

    //Models
var mongoose = require('mongoose'),
    stop = mongoose.model('Place');

    //Utils
var utilStop = require('../utils/place.utils'),
    vars = require('../config/google-places.json'); 

exports.getPlacesByLocation = function(req, res){
    
    var stops = utilStop.getPlacesByLocation(req.body.location, function(stops){
        if(stops){
            res.status(200).json({stops:stops});
        }else{
            res.status(500).json({message_error:"Error"});
        }
    });    
};

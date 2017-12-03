    //Modules

    //Models
var mongoose = require('mongoose'),
    stop = mongoose.model('Stop');

    //Utils
var utilStop = require('../utils/stop.utils'),
    vars = require('../config/google-places.json'); 

exports.getStopsByLocation = function(req, res){
    var stops = utilStop.getStopsByLocation(vars.development.location, function(stops){
        if(stops){
            res.status(200).json({stops:stops});
        }else{
            res.status(500).json({message_error:"Error"});
        }
    });    
};
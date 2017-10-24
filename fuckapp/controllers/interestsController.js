var mongoose = require('mongoose'),
 interests = mongoose.model('Interest');

  exports.get_interests = function(req,res){
     interests.find({}, function(err, interests){
        if (err){
            res.status(500);
            res.send(err);        
        }else{
            res.status(200);
            res.json({"interests": interests})
        }
     });
 };
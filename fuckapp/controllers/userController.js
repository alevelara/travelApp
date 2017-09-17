var mongoose = require('mongoose'),
 user = mongoose.model('users');

exports.insert_user = function(req, res){
    var new_user = new user(req.body);
    
    new_user.save(function(err, user){
        if(err)
            res.send(err);
        res.json(user);
    });
};

 exports.get_users = function(req,res){
     user.find({}, function(err, user){
        if (err)
            res.send(err);
        res.json({message: 'User succesfully added', user});        
     });
 };

 exports.get_user = function(req, res){    
     user.findById(req.params.userid, function(err, user){        
        if(err)
            res.send(err);
        res.json(user);
     });
 };

 exports.delete_user = function(req, res){    
     user.remove({_id: req.params.userid }, function(err, user){
        if(err)
            res.send(err);
        res.json({message: 'User succesfully deleted'});
     });
 };

 exports.update_user = function(req, res){
    user.findByIdAndUpdate({_id: req.params.userid}, req.body, {new: true}, function(err, user){
        if(err)
            res.send(err);
        res.json(user);
    });
 };
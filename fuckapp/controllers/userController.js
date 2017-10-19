var crypto = require('crypto');
var mongoose = require('mongoose'),
 user = mongoose.model('User');

exports.insert_user = function(req, res){
    var new_user = new user(req.body);
    new_user.setPassword(req.body.passoword);    
    new_user.save(function(err, user){
        if(err)
            res.send(err);
        var token;
        token = new_user.generateJwt();
        res.status(200);
        res.json({"token": token}, user);
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
        if(err){
            res.status(401).json({message:"user fail"});
        }           
            res.status(200).json(user);
            
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

 exports.update_user_interests = function(req, res){ 
    var new_user = new user(user);
    var isUser = new_user.verifyUser(req);
     console.log(new_user.verifyUser(req));     
     if(isUser == true){
        user.findByIdAndUpdate(req.params.id, {interests:req.body.interests},function(err, user){
            if(err){
                return res
                .status(401)
                .json({message:"Error updating interests"});
            }else{
                console.log({message:"interests updates"})
                return res.status(200).json({message:"interests updates"});
            }
        });
    }else{
        return res.status(403).json({message:"invalid token"});
    }     
};


exports.update_user_interests = function(req, res){ 
    var new_user = new user(user);
    var isUser = new_user.verifyUser(req);
     console.log(new_user.verifyUser(req));     
     if(isUser == true){
         console.log(req.body.interests);
        user.findByIdAndUpdate(req.params.id, {interests:req.body.interests},function(err, user){
            if(err){
                return res
                .status(404)
                .json({status:"error", error_message:"Error updating interests:" + err.message});
            }else{                
                return res.status(200).json({status:"success", message:"interests updates"});
            }
        });
    }else{
        return res.status(403).json({message:"invalid token"});
    }     
};


exports.get_user_interests = function(req, res){ 
    var new_user = new user(user);
    var isUser = new_user.verifyUser(req);
     console.log(new_user.verifyUser(req));     
        if (isUser == false) {
            return res.
            status(403).
            json({error_message:"invalid token"});
        } else {
         user.findOne({_id:req.params.id}).populate('interests').exec( function(err, user) {
            console.log(user);
            if (err) {
                return res
                .status(404)
                .json({status:"error", error_message: "Error retrieving user"});
            } else {
                console.log(user);
                return res.status(200).json({interests:user.interests})
            }
        });
    }
    
};



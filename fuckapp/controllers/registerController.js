var mongoose = require('mongoose'),
 register = mongoose.model('register');

 var mailCtrl = require('./mailerController');
 var error = require('../error');
//get user  
exports.get_user = function(req, res) {
    register.findOne({username: register.name, password: register.password}, function(err, register){
        if (err){
            console.log('Login fail: date: %d', Date.now);
            return err
        }             
        else
            console.log('Login succes: name: %s password: %s - date: %d', register.name, register.password, Date.now);
    });
};


function check_username(username, callback){
    register.findOne({username: username}, function(err, register){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(register);
        }
    });
};

 exports.insert_login = function(req, res){
    var user_login = check_username(req.body.username, function(user_login){        
        if(user_login){
        console.log( user_login.username + " already exists. ");     
        res.end();   
        }else{
            var login = new register(req.body);            
            login.save(function(err, register){
            if(err){
                res.send(err);
            }else{
                console.log("Login Succesful");
                res.json(register); 
                // After success login, we'll send a email verification          
                mailCtrl.sendEmail(register.username);
            }  
        });
    };

});
    
   

    
};


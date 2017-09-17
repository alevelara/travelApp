var mongoose = require('mongoose'),
 register = mongoose.model('register');
 user = mongoose.model('users');

 var mailCtrl = require('./mailerController');
 var error = require('../error');
//get user  
exports.login = function(req, res) {
    let email = req.body.email
    let password = req.body.password    
    user.findOne({email: email, password: password}, function(err, user){
        console.log(email);
        console.log(password);
        if (err){
            console.log('Login fail: date: %d', Date.now);            
            return res.send(err);     
            
        }else if(user == null){
            console.log('Incorrect user or password: date: %d', Date.now);
           return res.send('404');
        }
        else            
            console.log('Login succes: name: %s password: %s - date: %d', email, password, Date.now);
           return res.send('success');
    });
};

function check_username(username, callback){
    user.findOne({email: username}, function(err, user){
        if(err){                       
            console.log(err);
            return callback(err);
        }else{            
            return callback(user);
        }
    });
};

 exports.signup = function(req, res){
    var user_login = check_username(req.body.email, function(user_login){        
        if(user_login){
        console.log(user_login.email + " already exists. ");     
        res.send('error');   
        }else{
            var login = new user(req.body);            
            login.save(function(err, user){
            if(err){
                return res.send(err);
            }else{
                console.log("Login Succesful");                
                res.json({message:"success"}); 
                // After success login, we'll send a email verification          
                mailCtrl.sendEmail(user.email);
            }  
        });
    };

});
    
   

    
};


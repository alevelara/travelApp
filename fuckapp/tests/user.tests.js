process.env.NODE_ENV = "test";

var app = require('../app');

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    mocha = require('mocha'),
    should = chai.should(),
    expect = chai.expect;        
    chai.use(chaiHttp);

var api = chai.request(app);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTIyOWI5OWYwNzdjYzJmODRlOWNiYTYiLCJlbWFpbCI6ImFsZXZlbGFyYUBnbWFpbC5jb20iLCJuYW1lIjoiQWxlamFuZHJvIiwiZXhwIjoxNTEyODIyMjk3LCJpYXQiOjE1MTIyMTc0OTd9.kSer1wTPccBEH8WPgH_Ebsbw248Lwg3eZJYccjAnSw8";
const token_error = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY1YzliODk2OGMwMzA1ZDg5Y2IyZjEiLCJlbWFpbCI6ImFsZXZlbGFyYUBnbWFpbC5jb20iLCJuYW1lIjoiQWxlamFuZHJvIiwiZXhwIjoxNTExOTc4MTkzLCJpYXQiOjE1MTEzNzMzOTN9.61C3QtLv8mj8h86gtajp6SFGryEh8Ebe3ilw2-cOZyY";
const forgotten_token_password = "d6ejPgeaVE"
const img = { fieldname: 'img',
    originalname: '1086321.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './uploads',
    filename: 'img_1511466951625_1086321.png',
    path: 'uploads\\img_1511466951625_1086321.png',
    size: 9039 };

describe('Users', function(){
    it('should return all users', function(done){
        api.get('/users')
        .end(function(err, res){
            res.should.have.status(200);            
            res.body.should.have.property('message');
            res.body.should.have.property('user');
            res.body.message.should.be.a("String");
            res.body.user.should.be.a('array');               
            res.body.user[0].should.have.property('name');
            res.body.user[0].should.have.property('email');
            res.body.user[0].should.have.property('hash');
            res.body.user[0].should.have.property('salt') ;           
            done();
        });
    
    });

    it('should add new user', function(done){
        api.post('/user')
        .send({email: "alevelara@gmail.com", name:"Alejandro", password:"123456"})
        .end(function(err, res){
            res.should.have.status(200);            
            res.body.should.have.property('token');
            res.body.should.have.property('user');
            res.body.token.should.be.a("String");
            res.body.user.should.be.a('Object');               
            res.body.user.should.have.property('name');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('hash');
            res.body.user.should.have.property('salt') ;           
            done();
        });
    
    });

    it('should return token error', function(done){
        api.get('/user')
        .set("auth_token", token_error)
        .end(function(err, res){
            res.should.have.status(404);
            res.body.should.have.property("error_message");
            done();
        });
    });

    it('should return user data from token validation', function(done){
        api.get('/user')
        .set("auth_token", token)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.user.should.be.a('Object');
            res.body.should.have.property('user');
            done();
        });
    });
    
    it('should delete one user by id', function(done){
        api.delete('/user')        
        .send({userid: "5a15bc744c44c10ebc93f53e"})
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.be.a('String');            
            done();
        });
    });

    it('should return interests from current user', function(done){
        api.get('/user/interests')
        .set("auth_token", token)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('interests');
            res.body.interests.should.be.a('array');
            done();
        });
    });

    it('should update current user interests', function(done){
        api.post('/user/interests')
        .set("auth_token", token)
        .send({interests:"59eb1b4414f0302d6ed9f1b9", interests: "59eb1b2214f0302d6ed9f1a8", interests:"59eb1b1314f0302d6ed9f1a3"})
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.be.a('String');
            done();
        });
    });

    it('should return current user interests', function(done){
        api.get('/user/interests')        
        .set("auth_token", token)    
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('interests');
            res.body.interests.should.be.a('array');
            done();
        });
    });
   
   
    /*
    it('should send an email with new password', function(done){
        api.post('/user/password/recovery')        
        .send({email: "alevelara@gmail.com"})
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('status');
            res.body.status.should.be.a('String');
            res.body.should.have.property('message');
            res.body.message.should.be.a('String');
            done();
        });
    });
    */

    it('should reset user password', function(done){
        api.post('/user/password/reset')        
        .send({email: "alevelara@gmail.com", reset_password_token: forgotten_token_password, new_password:"gatitos123"})
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('status');
            res.body.status.should.be.a('String');
            res.body.should.have.property('session_info');
            res.body.status.should.be.a('String');
            res.body.session_info.should.have.property('token');
            res.body.session_info.token.should.be.a('String');
            res.body.session_info.should.have.property('user');
            res.body.session_info.user.should.be.a('Object');
            res.body.session_info.user.should.have.property('_id');
            res.body.session_info.user._id.should.be.a('String');
            res.body.session_info.user.should.have.property('email');
            res.body.session_info.user.email.should.be.a('String');
            res.body.session_info.user.should.have.property('name');
            res.body.session_info.user.name.should.be.a('String');
            done();
        });
    });

    it('should return user photo profile', function(done){
        api.get('/user/photo/profile')
        .set("auth_token", token)      
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.be.a('String');
            done();
        });
    });

    it('should return user photo profile', function(done){
        api.post('/user/photo/profile')
        .set("auth_token", token)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({"img": img})      
        .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.be.a('String');
            done();
        });
    });

});
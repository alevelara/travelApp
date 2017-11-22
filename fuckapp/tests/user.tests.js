var app = require('../app');

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    mocha = require('mocha'),
    should = chai.should(),
    expect = chai.expect;
        
    chai.use(chaiHttp);

var api = chai.request(app);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY1YzliODk2OGMwMzA1ZDg5Y2IyZjEiLCJlbWFpbCI6ImFsZXZlbGFyYUBnbWFpbC5jb20iLCJuYW1lIjoiQWxlamFuZHJvIiwiZXhwIjoxNTExOTc4MTkzLCJpYXQiOjE1MTEzNzMzOTN9.61C3QtLv8mj8h86gtajp6SFGryEh8Ebe3ilw2-cOZyY";
const token_error = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY1YzliODk2OGMwMzA1ZDg5Y2IyZjEiLCJlbWFpbCI6ImFsZXZlbGFyYUBnbWFpbC5jb20iLCJuYW1lIjoiQWxlamFuZHJvIiwiZXhwIjoxNTExOTc4MTkzLCJpYXQiOjE1MTEzNzMzOTN9.61C3QtLv8mj8h86gtajp6SFGryEh8Ebe3ilw2-cOZyY";
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
            res.body.should.be.a('Object');
            res.body.should.have.property('user');
            done();
        });
    });



    

});
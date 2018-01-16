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
const name = "Alejandro";
const email = "prueba@gmail.com"
const password = "prueba_pw"
describe('Register', function(){
    it('Should signup new user', function(done){
        api.post('/signup')
        .send({name:name,email:email,password:password})
        .end(function(err, res){
            res.should.have.status(200);            
            res.body.should.have.property('status');
            res.body.should.have.property('session_info');
            res.body.status.should.be.a("String");
            res.body.session_info.should.be.a('Object');               
            res.body.session_info.should.have.property('token');
            res.body.session_info.token.should.be.a("String");          
            res.body.session_info.should.have.property('user');
            res.body.session_info.user.should.be.a("Object");
            res.body.session_info.user.should.have.property('_id');
            res.body.session_info.user._id.should.be.a("String");
            res.body.session_info.user.should.have.property('email');
            res.body.session_info.user.email.should.be.a("String");
            res.body.session_info.user.should.have.property('name');
            res.body.session_info.user.name.should.be.a("String");
            done();
        });    
    });


    it('Should login', function(done){
        api.post('/login')
        .send({name:name,email:email,password:password})
        .end(function(err, res){
            res.should.have.status(200);            
            res.body.should.have.property('status');
            res.body.should.have.property('session_info');
            res.body.status.should.be.a("String");
            res.body.session_info.should.be.a('Object');               
            res.body.session_info.should.have.property('token');
            res.body.session_info.token.should.be.a("String");          
            res.body.session_info.should.have.property('user');
            res.body.session_info.user.should.be.a("Object");
            res.body.session_info.user.should.have.property('_id');
            res.body.session_info.user._id.should.be.a("String");
            res.body.session_info.user.should.have.property('email');
            res.body.session_info.user.email.should.be.a("String");
            res.body.session_info.user.should.have.property('name');
            res.body.session_info.user.name.should.be.a("String");
            done();
        });    
    });
});

process.env.NODE_ENV = "test";

var app = require('../app');

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    mocha = require('mocha'),
    should = chai.should(),
    expect = chai.expect;        
    chai.use(chaiHttp);

var api = chai.request(app);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImV4cCI6MTUxOTg1OTc0NC41MTMsImlhdCI6MTUxOTI1NDk0NH0.-W1xqfO9sMFXt1S81_1OWyZhfCgb4rup-FdyrcOVHWk";
const username = "prueba1";
const fullName = "prueba1 test2";
const email = "prueba1@fuckapp.com";
const password = "prueba2";

describe('Register', function(){
    it('Should signup new user', function(done){
        api.post('/signup')       
        .send(
            {
                email:email,
                full_name:fullName,
                password:password,
                username:username                            
            })
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
            res.body.session_info.user.should.have.property('phone_number');
            res.body.session_info.user.phone_number.should.be.a("String");
            res.body.session_info.user.should.have.property('description');
            res.body.session_info.user.description.should.be.a("String");
            res.body.session_info.user.should.have.property('hometown');
            res.body.session_info.user.hometown.should.be.a("String");                        
            res.body.session_info.user.should.have.property('id');
            res.body.session_info.user.id.should.be.a("Number"); // Change to String when merge uuid
            res.body.session_info.user.should.have.property('username');
            res.body.session_info.user.username.should.be.a("String");
            res.body.session_info.user.should.have.property('email');
            res.body.session_info.user.email.should.be.a("String");
            res.body.session_info.user.should.have.property('full_name');
            res.body.session_info.user.full_name.should.be.a("String");
            res.body.session_info.user.should.have.property('salt');
            res.body.session_info.user.salt.should.be.a("String");
            res.body.session_info.user.should.have.property('hash');
            res.body.session_info.user.hash.should.be.a("String");            
            done();
        });    
    });    


    it('Should login', function(done){
        api.post('/login')       
        .send({
            email:email,
            password:password
        })
        .end(function(err, res){
            res.should.have.status(200);            
            res.body.should.have.property('status');
            res.body.status.should.be.a("String");
            res.body.should.have.property('session_info');            
            res.body.session_info.should.be.a('Object');               
            res.body.session_info.should.have.property('token');
            res.body.session_info.token.should.be.a("String");          
            res.body.session_info.should.have.property('user');
            res.body.session_info.user.should.be.a("Object");
            res.body.session_info.user.should.have.property('id');
            res.body.session_info.user.id.should.be.a("number"); // Change for String when merge uuid
            res.body.session_info.user.should.have.property('email');
            res.body.session_info.user.email.should.be.a("String");
            res.body.session_info.user.should.have.property('name');
            res.body.session_info.user.name.should.be.a("String");            
            done();
        });    
    });
});

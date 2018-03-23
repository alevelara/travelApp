process.env.NODE_ENV = "test";

var app = require('../app');
const testUtils = require('./testUtils');

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    mocha = require('mocha'),
    should = chai.should(),
    expect = chai.expect;
chai.use(chaiHttp);

var api = chai.request(app);
var userUUId = "";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJleHAiOjE1MjIzNDQ0OTIuMjgzLCJpYXQiOjE1MjE3NDMyOTJ9.-W2eKhGMu9s7srbTGgGC6Glpwi_2g3gqR3U-BKmt1NE";
const username = "prueba1";
const updateUsername = "pruebaUpdate";
const fullName = "prueba1 test2";
const updateFullName = "update prueba1 test2";
const email = "prueba1@fuckapp.com";
const updateEmail = "test@mail.com";
const password = "prueba1";
var newPassword = "prueba2";
var resetPasswordtoken = '';
var authToken = testUtils.getAuthToken();

describe('User', function(){
    it('Should get all users', function(done){
        api.get('/users')
            .set('auth_token', token)
            .set('Authorization', authToken)
            .end(function(err, res){
                console.log(authToken);
                userUUId = res.body.users[0].uuid;
                console.log(res.body.users[0].uuid);
                res.should.have.status(200);
                res.body.should.have.property('users');
                res.body.users.should.be.a("Array");
                res.body.users[0].should.be.a("Object");
                res.body.users[0].should.be.a("Object");
                res.body.users[0].should.have.property('phone_number');
                res.body.users[0].phone_number.should.be.a("String");
                res.body.users[0].should.have.property('description');
                res.body.users[0].description.should.be.a("String");
                res.body.users[0].should.have.property('hometown');
                res.body.users[0].hometown.should.be.a("String");
                res.body.users[0].should.have.property('uuid');
                res.body.users[0].uuid.should.be.a("String");
                res.body.users[0].should.have.property('username');
                res.body.users[0].username.should.be.a("String");
                res.body.users[0].should.have.property('email');
                res.body.users[0].email.should.be.a("String");
                res.body.users[0].should.have.property('full_name');
                res.body.users[0].full_name.should.be.a("String");
                res.body.users[0].should.have.property('salt');
                res.body.users[0].salt.should.be.a("String");
                res.body.users[0].should.have.property('hash');
                res.body.users[0].hash.should.be.a("String");
                done();
            });
    });

    it('Should get one user by uuid', function(done){
        api.get('/user/'+ userUUId)
            .set('auth_token', token)
            .set('Authorization', authToken)
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.have.property('user');
                res.body.user.should.be.a("Object");
                res.body.user.should.be.a("Object");
                res.body.user.should.be.a("Object");
                res.body.user.should.have.property('phone_number');
                res.body.user.phone_number.should.be.a("String");
                res.body.user.should.have.property('description');
                res.body.user.description.should.be.a("String");
                res.body.user.should.have.property('hometown');
                res.body.user.hometown.should.be.a("String");
                res.body.user.should.have.property('uuid');
                res.body.user.uuid.should.be.a("String");
                res.body.user.should.have.property('username');
                res.body.user.username.should.be.a("String");
                res.body.user.should.have.property('email');
                res.body.user.email.should.be.a("String");
                res.body.user.should.have.property('full_name');
                res.body.user.full_name.should.be.a("String");
                res.body.user.should.have.property('salt');
                res.body.user.salt.should.be.a("String");
                res.body.user.should.have.property('hash');
                res.body.user.hash.should.be.a("String");
                done();
            });
    });

    it('Should change user password', function(done){
        api.post('/user/password/recovery')
            .set('Authorization', authToken)
            .send({
                email: updateEmail
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.have.property('status');
                res.body.should.have.property('resetPasswordtoken');
                res.body.status.should.be.a("String");
                res.body.resetPasswordtoken.should.be.a('String');
                resetPasswordtoken = res.body.resetPasswordtoken;                
                done();
            });
    });

    it('Should reset user password', function(done){
        api.post('/user/password/reset')
            .set('Authorization', testUtils.getAuthToken())
            .send({
                email: updateEmail,
                reset_password_token: resetPasswordtoken,
                new_password: newPassword
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.have.property('user');
                res.body.user.should.be.a("Object");
                res.body.user.should.be.a("Object");
                res.body.user.should.be.a("Object");
                res.body.user.should.have.property('phone_number');
                res.body.user.phone_number.should.be.a("String");
                res.body.user.should.have.property('description');
                res.body.user.description.should.be.a("String");
                res.body.user.should.have.property('hometown');
                res.body.user.hometown.should.be.a("String");
                res.body.user.should.have.property('uuid');
                res.body.user.uuid.should.be.a("String");
                res.body.user.should.have.property('username');
                res.body.user.username.should.be.a("String");
                res.body.user.should.have.property('email');
                res.body.user.email.should.be.a("String");
                res.body.user.should.have.property('reset_password_token');
                res.body.user.reset_password_token.should.be.a("String");
                res.body.user.should.have.property('full_name');
                res.body.user.full_name.should.be.a("String");
                res.body.user.should.have.property('salt');
                res.body.user.salt.should.be.a("String");
                res.body.user.should.have.property('hash');
                res.body.user.hash.should.be.a("String");
                done();
            });
    });

    it('Should update an existing user', function(done){
        api.put('/user/'+ userUUId)
            .set('auth_token', token)
            .set('Authorization', authToken)
            .send({
                user:{
                    email:updateEmail,
                    full_name:updateFullName,
                    username:updateUsername
                }
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.have.property('user');
                res.body.user.should.be.a("Object");
                res.body.user.should.have.property('phone_number');
                res.body.user.phone_number.should.be.a("String");
                res.body.user.should.have.property('description');
                res.body.user.description.should.be.a("String");
                res.body.user.should.have.property('hometown');
                res.body.user.hometown.should.be.a("String");
                res.body.user.should.have.property('uuid');
                res.body.user.uuid.should.be.a("String");
                res.body.user.should.have.property('username');
                res.body.user.username.should.be.a("String");
                res.body.user.should.have.property('email');
                res.body.user.email.should.be.a("String");
                res.body.user.should.have.property('full_name');
                res.body.user.full_name.should.be.a("String");
                res.body.user.should.have.property('salt');
                res.body.user.salt.should.be.a("String");
                res.body.user.should.have.property('hash');
                res.body.user.hash.should.be.a("String");
                done();
            });
    });

    it('Should search users', function(done){
        api.post('/user/search')
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
            .send({
                name: "test"
            }).end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('users');
            res.body.users.should.be.a("Array");+
                res.body.users[0].should.be.a("Object");
            res.body.users[0].should.be.a("Object");
            res.body.users[0].should.have.property('phone_number');
            res.body.users[0].phone_number.should.be.a("String");
            res.body.users[0].should.have.property('description');
            res.body.users[0].description.should.be.a("String");
            res.body.users[0].should.have.property('hometown');
            res.body.users[0].hometown.should.be.a("String");
            res.body.users[0].should.have.property('uuid');
            res.body.users[0].uuid.should.be.a("String"); 
            res.body.users[0].should.have.property('username');
            res.body.users[0].username.should.be.a("String");
            res.body.users[0].should.have.property('email');
            res.body.users[0].email.should.be.a("String");
            res.body.users[0].should.have.property('full_name');
            res.body.users[0].full_name.should.be.a("String");
            res.body.users[0].should.have.property('salt');
            res.body.users[0].salt.should.be.a("String");
            res.body.users[0].should.have.property('hash');
            res.body.users[0].hash.should.be.a("String");
            res.body.should.have.property('offset');
            res.body.offset.should.be.a("String");
            done();
        });
    });

});
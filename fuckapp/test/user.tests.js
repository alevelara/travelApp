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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicHJ1ZWJhMUBmdWNrYXBwLmNvbSIsImV4cCI6MTUyMDE5NTM0My42OTgsImlhdCI6MTUxOTU5MDU0M30.be3yVtbXCTF4ENwI34T4bXhNYycMwsPNZoVkEqplt_w";
const userId = 1;
const username = "prueba1";
const updateUsername = "pruebaUpdate";
const fullName = "prueba1 test2";
const updateFullName = "update prueba1 test2";
const email = "prueba1@fuckapp.com";
const updateEmail = "prueba2@update.com";
const password = "prueba1";
var newPassword = "prueba2";
var resetPasswordtoken = "";


describe('User', function(){
    it('Should get all users', function(done){
        api.get('/users')
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
            .end(function(err, res){
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
                res.body.users[0].should.have.property('id');
                res.body.users[0].id.should.be.a("Number"); // Change to String when merge uuid
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

    it('Should get one user by id', function(done){
        api.get('/user/'+ userId)
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
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
                res.body.user.should.have.property('id');
                res.body.user.id.should.be.a("Number"); // Change to String when merge uuid
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
            .set('Authorization', testUtils.getAuthToken())
            .send({
                email:email
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
                email:email,
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
                res.body.user.should.have.property('id');
                res.body.user.id.should.be.a("Number"); // Change to String when merge uuid
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
        api.put('/user/'+ userId)
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
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
                res.body.user.should.have.property('id');
                res.body.user.id.should.be.a("Number"); // Change to String when merge uuid
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
            res.body.users[0].should.have.property('id');
            res.body.users[0].id.should.be.a("Number"); // Change to String when merge uuid
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
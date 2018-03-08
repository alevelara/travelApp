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

//  app.put('/user/:id/interests', secureRequest.validateSecureRequest, userInterests.updateUserInterests);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoicHJ1ZWJhMUBmdWNrYXBwLmNvbSIsImV4cCI6MTUyMDE5NTM0My42OTgsImlhdCI6MTUxOTU5MDU0M30.be3yVtbXCTF4ENwI34T4bXhNYycMwsPNZoVkEqplt_w";
const userId = 1;


describe('User Intersts', function(){
    it('Should get all interests by userId', function(done){
        api.get('/user/'+userId+'/interests')
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.have.property('interests');
                res.body.interests.should.be.a("Array");
                res.body.interests[0].should.be.a("Object");
                res.body.interests[0].should.have.property('id');
                res.body.interests[0].id.should.be.a("Number"); //Change for String when merge uuid branch
                res.body.interests[0].should.have.property('name');
                res.body.interests[0].name.should.be.a("String");
                res.body.interests[0].should.have.property('photo_id');
                res.body.interests[0].photo_id.should.be.a("Number"); //Change for String when merge uuid branch
                done();
            });
    });


    it('Should update interests by userId', function(done){
        api.put('/user/'+userId+'/interests')
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
            .send({
                interest_ids:[1,2,5]
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.have.property('interests');
                res.body.interests.should.be.a("Array");
                res.body.interests[0].should.be.a("Object");
                res.body.interests[0].should.have.property('id');
                res.body.interests[0].id.should.be.a("Number"); //Change for String when merge uuid branch
                res.body.interests[0].should.have.property('name');
                res.body.interests[0].name.should.be.a("String");
                res.body.interests[0].should.have.property('photo_id');
                res.body.interests[0].photo_id.should.be.a("Number"); //Change for String when merge uuid branch
                res.body.interests[0].should.have.property('user_interest');
                res.body.interests[0].user_interest.should.be.a("Object");
                res.body.interests[0].user_interest.have.property('userId');
                res.body.interests[0].user_interest.userId.should.be.a("Number");//Change for String when merge uuid branch
                res.body.interests[0].user_interest.have.property('interestId');
                res.body.interests[0].user_interest.interestId.should.be.a("Number");//Change for String when merge uuid branch
                done();
            });
    });
});
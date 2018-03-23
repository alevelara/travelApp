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

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJleHAiOjE1MjIzNDQ0OTIuMjgzLCJpYXQiOjE1MjE3NDMyOTJ9.-W2eKhGMu9s7srbTGgGC6Glpwi_2g3gqR3U-BKmt1NE";

describe('Interest', function(){
    it('Should get all interests', function(done){
        api.get('/interests')
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.have.property('interests');
                res.body.interests.should.be.a("Array");
                res.body.interests[0].should.be.a("Object");
                res.body.interests[0].should.have.property('uuid');
                res.body.interests[0].uuid.should.be.a("String"); 
                res.body.interests[0].should.have.property('name');
                res.body.interests[0].name.should.be.a("String");
                res.body.interests[0].should.have.property('photo_uuid');
                res.body.interests[0].photo_uuid.should.be.a("String"); 
                done();
            });
    });
});
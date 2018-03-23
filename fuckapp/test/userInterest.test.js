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
const interest_uuids = ['080bfea0-2e08-11e8-8206-61e7eeb06fd6','080d3720-2e08-11e8-8206-61e7eeb06fd6','080d8540-2e08-11e8-8206-61e7eeb06fd6'];


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJleHAiOjE1MjIzNDQ0OTIuMjgzLCJpYXQiOjE1MjE3NDMyOTJ9.-W2eKhGMu9s7srbTGgGC6Glpwi_2g3gqR3U-BKmt1NE";
const useruuId = '18569170-2e09-11e8-9fdf-bbf4d6444688';


describe('User Intersts', function(){
    it('Should update interests by userUuid', function(done){
        api.put('/user/'+useruuId+'/interests')
            .set('auth_token', token)
            .set('Authorization', testUtils.getAuthToken())
            .send({
                interest_uuids: interest_uuids
            })
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
                res.body.interests[0].should.have.property('user_interest');
                res.body.interests[0].user_interest.should.be.a("Object");              
                done();
            });
    });    
    
    it('Should get all interests by userUuid', function(done){
        api.get('/user/'+useruuId+'/interests')
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
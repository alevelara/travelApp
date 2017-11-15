var serverUrl = require('../config/default.json');

var shoud = require('chai').should(),
    expect = require('chai').expect(),
    supertest = require('supertest'),    
    api = supertest("http://localhost:8080");


describe('Users', function(){
    it('should return all users', function(done){
        api.get('/users')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res){
        expect(res.body).to.have.property("name");
        expect(res.body.name).to.not.be(null);
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.not.be(null);
        expect(res.body).to.have.property("hash");
        expect(res.body.hash).to.not.be(null);
        expect(res.body).to.have.property("salt");
        expect(res.body.salt).to.not.be(null);        
    });
    done();
    });

});
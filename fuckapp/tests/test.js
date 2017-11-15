var serverUrl = require('../config/default.json');

var shoud = require('chai').should(),
    expect = require('chai').expect(),
    supertest = require('supertest'),    
    api = supertest(serverUrl.defaultUrl.DBHost);


describe('get all users', function(done){
    api.get('/users')
    .set('Accept', 'application/json')
    .expect(200, done);
});
process.env.NODE_ENV = "test";

const testUtils = require('./testUtils');
const app = require('../app');
const fs = require('fs');
const photoController = require('../components/photos/photo.controller');

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    chaiAsPromised = require("chai-as-promised"),
    mocha = require('mocha'),
    should = chai.should(),
    expect = chai.expect;        
    chai.use(chaiHttp);
    chai.use(chaiAsPromised);

const api = chai.request(app);

describe('savePhoto', function () {
    const photoName = 'viaje.jpg';
    const photoPath = __dirname + '/photos/' + photoName;    
    const authToken = testUtils.getAuthToken();

    var photoUuid = '';

    it('should store the photo and return its id', function () {
        return api.post('/photo')
            .set('Authorization', authToken)
            .attach('photo', fs.readFileSync(photoPath), photoName)
            .then(res => {
                res.should.have.status(200);            
                res.body.should.have.property('photo_uuid');
                photoUuid = res.body.photo_uuid;
            });

    });
    it('should be possible to download the photo using its uuid', function () {
        return api.get(`/photo/${photoUuid}`)
            .set('Authorization', authToken)
            .then(res => {
                expect(res.headers).to.have.property("content-type");
                expect(res.headers).to.have.property("content-disposition");
            });
    });
});



describe('validatePhoto', function () {
    it('should return valid for a valid photo and mime-type', function () {
        const validPhoto = {
            fieldname: "photo",
            originalname: "a968c7d814a6a66cdf59d8dc1e4e3cec.jpg",
            encoding: "7bit",
            mimetype: "image/!*",
            destination: "uploads/",
            filename: "a968c7d814a6a66cdf59d8dc1e4e3cec.jpg",
            path: "uploads/a968c7d814a6a66cdf59d8dc1e4e3cec.jpg",
            size: "1966829",
        };

        return Promise.resolve(photoController.validatePhoto(validPhoto))
            .should.eventually.equal(true);
    });

    const badMimeTypeError = "Invalid mime-type: bad_mime_type";
    it(`should be rejected with ${badMimeTypeError}`, function () {
        const inValidPhoto = {
            fieldname: "photo",
            originalname: "a968c7d814a6a66cdf59d8dc1e4e3cec.jpg",
            encoding: "7bit",
            mimetype: "bad_mime_type",
            destination: "uploads/",
            filename: "a968c7d814a6a66cdf59d8dc1e4e3cec.jpg",
            path: "uploads/a968c7d814a6a66cdf59d8dc1e4e3cec.jpg",
            size: "1966829",
        };

        Promise.resolve(photoController.validatePhoto(inValidPhoto))
            .should.be.rejectedWith(badMimeTypeError);
    })
});
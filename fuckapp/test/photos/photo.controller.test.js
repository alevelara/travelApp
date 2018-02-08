process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const chaiHttp = require('chai-http');
chai.use(chaiAsPromised);
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const photoController = require('../../components/photos/photo.controller');
const app = require('../../app');
const api = chai.request(app);
const fs = require('fs');

const photoName = 'viaje.jpg';
const photoPath = __dirname + '/' + photoName;

describe('savePhoto', function () {
    var photoId;
    it('should store the photo and return its id', function () {
        return api.post('/photo')
            .attach('photo', fs.readFileSync(photoPath), photoName)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('photo_id');
                photoId = res.body.photo_id;
            })

    });
    it('should be possible to download the photo using its id', function () {
        api.get(`/photo/${photoId}`)
            .then((res) => {
                expect(res.headers).to.have.property("Content-Type");
                expect(res.headers).to.have.property("Content-Disposition");
            })
    });
});


/*
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
});*/

const models = require('../models');
const Interest = models['interest'];
const Sequelize = require('../server').sequelize;

const names = ["Bars", "Museums", "Music", "Tourism", "Food", "Cultural"];

const createInterests = function () {
    getPhotos()
        .then(photos => {
            console.log(photos);
            let count = 0;
            photos.forEach(function(photo) {
                console.log("name: " + names[count]);
                console.log("photo: " + photo.uuid);
                var interest = {
                    name: names[count++],
                    photo_uuid: photo.uuid,
                };
                console.log(interest);
                addInterest(interest);
            });
        });
};

var addInterest = function (interest) {
    return Interest.create({
        name: interest.name,
        photo_uuid: interest.photo_uuid,
    });
};

var getPhotos = function () {
    const query = "SELECT * FROM photos";
    return Sequelize.query(query,
        {
            type: Sequelize.QueryTypes.SELECT
        });
};

createInterests();



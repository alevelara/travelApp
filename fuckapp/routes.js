let index = require('./index.routes'),
    routes = require('./components/users/user.routes'),
    login = require('./components/registers/register.routes'),
    interests = require('./components/interests/interest.routes'),
    photos = require('./components/photos/photo.routes'),
    userInterests = require('./components/userInterests/userInterest.routes'),
    googlePlaces = require('./components/googlePlaces/googlePlaces.routes');


module.exports = function(app) {
    index(app);
    routes(app);
    login(app);    
    interests(app);    
    photos(app);
    userInterests(app);
    googlePlaces(app);
};

let index = require('./index.routes'),
    routes = require('./components/users/user.routes'),
    login = require('./components/registers/register.routes'),
    interests = require('./components/interests/interest.routes'),
    photos = require('./components/photos/photo.routes'),
    userInterests = require('./components/users/userInterests/userInterest.routes');
    tripTypes = require('./components/tripTypes/tripType.routes');
    trips = require('./components/trips/trip.routes');
    tripInterests = require('./components/trips/tripInterests/tripInterest.routes');
    tripUser = require('./components/trips/tripUsers/tripUser.routes');
    tripTripTypes = require('./components/trips/tripTripTypes/tripTripType.routes');
    comments = require('./components/comments/comment.routes');

module.exports = function(app) {

    index(app);
    routes(app);
    login(app);    
    interests(app);    
    photos(app);
    userInterests(app);
    trips(app);
    tripTypes(app);
    tripInterests(app);
    tripUser(app);
    comments(app);
    tripTripTypes(app);

};

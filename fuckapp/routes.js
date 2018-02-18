module.exports = function(app) {
    require('./models/user');
    require('./models/interest');
    require('./models/photo');
    require('./models/userInterest');
    
    var index = require('./index.routes'),
        routes = require('./components/users/user.routes'),
        login = require('./components/registers/register.routes'),
        interests = require('./components/interests/interest.routes'),
        photos = require('./components/photos/photo.routes'),
        userInterests = require('./components/userInterests/userInterest.routes');

    index(app);
    routes(app);
    login(app);    
    interests(app);    
    photos(app);
    userInterests(app);
}

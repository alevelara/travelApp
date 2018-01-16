module.exports = function(app) {
    require('./components/users/users.models');
    require('./components/interests/interests.models');
    require('./components/photos/photos.models');
    
    var index = require('./index.routes'),
        routes = require('./components/users/user.routes'),
        login = require('./components/registers/register.routes'),
        interests = require('./components/interests/interest.routes'),
        photos = require('./components/photos/photo.routes');
        
    index(app);
    routes(app);
    login(app);    
    interests(app);    
    photos(app);
}

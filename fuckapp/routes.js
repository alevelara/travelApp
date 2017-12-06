module.exports = function(app) {
    require('./models/users.models');
    require('./models/interests.models');
    require('./models/photos.models');
    require('./models/places.models');
    
    var index = require('./routes/index.routes'),
        users = require('./routes/user.routes'),
        login = require('./routes/register.routes'),
        interests = require('./routes/interest.routes'),
        photos = require('./routes/photo.routes'),
        places = require('./routes/place.routes');
        
    index(app);
    users(app);
    login(app);    
    interests(app);    
    photos(app);
    places(app);
}

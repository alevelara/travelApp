module.exports = function(app) {
    require('./models/users.models');
    require('./models/interests.models');
    require('./models/photos.models');
    
    var index = require('./routes/index.routes'),
        routes = require('./routes/user.routes'),
        login = require('./routes/register.routes'),
        interests = require('./routes/interest.routes'),
        photos = require('./routes/photo.routes');
        
    index(app);
    routes(app);
    login(app);    
    interests(app);    
    photos(app);
}

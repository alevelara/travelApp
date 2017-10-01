module.exports = function(app) {
    require('./models/User');
    require('./models/Interest');
    
    var index = require('./routes/index')
    index(app)
    var routes = require('./routes/users')
    routes(app);
    var login = require('./routes/login')
    login(app);
    var interests = require('./routes/interests')
    interests(app);
}

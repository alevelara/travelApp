module.exports = function(app) {
    var index = require('./routes/index')
    index(app)
    var routes = require('./routes/users')
    routes(app);
    var login = require('./routes/login')
    login(app);
}

const basicAuth = require('express-basic-auth');
const config = require('../config/config');

module.exports = function (app) {
    const user = config.get('basic_http_authorization_user');
    const password = config.get('basic_http_authorization_password');

    app.use(basicAuth({
        users : { [user]: password }
    }))
};

const config = require('../config/config');


exports.getAuthToken = function () {
    const user = config.get('basic_http_authorization_user');
    const password = config.get('basic_http_authorization_password');

    return "Basic " + Buffer.from(`${user}:${password}`).toString('base64');
};

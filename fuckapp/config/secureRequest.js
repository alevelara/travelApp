

const jwt = require('jsonwebtoken');
const env_var = require('./var.json');

/**
 * Validate token header
 *
 * @param req Request
 * @param res Response
 * @param next
 * @param req.headers.auth_token
 */
exports.validateSecureRequest = function(req, res, next) {
    const token = req.headers.auth_token;
    const result = {
        payload: null,
        status: 0,
        message: ""
    };

    try {
        verifyUser(token,result);
    } catch(error) {
        return res.status(result.status).json({error_message: error.message});
    }
    next();
};

function verifyUser(token, result){
    jwt.verify(token, env_var.development.JWT_KEY, function(err, payload){
        if(err){
            result.status = 404;
            result.message = 'Token not found';
            throw new Error(result.message);
        }else{
            let expiredTime = (payload.exp * 1000);
            if(expiredTime <= Date.now()){
                result.status = 401;
                result.message = "Token has expired";
                throw new Error(result.message);
            }else{
                result.payload = payload;
                result.status = 200;
            }
        }
    });
}

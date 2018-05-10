
const commentController = require('./comment.controller');
const secureRequest = require('../../middleware/secureRequest');

module.exports = function(app) {
    app.post('/comment',secureRequest.validateSecureRequest, commentController.addComment);
    app.put('/comment/:uuidComment',secureRequest.validateSecureRequest, commentController.modifyComment);
    app.delete('/comment/:uuidComment',secureRequest.validateSecureRequest, commentController.deleteComment);    
    app.get('/comment/all',secureRequest.validateSecureRequest, commentController.getAllComments);
    app.get('/comment/:uuidComment', secureRequest.validateSecureRequest, commentController.getComment);

    app.get('/comment/user/:uuidUser', secureRequest.validateSecureRequest, commentController.getCommentsByUuidUser);
    app.get('/comment/user/:uuidUser/visible', secureRequest.validateSecureRequest, commentController.getVisibleCommentsByUuidUser);
    app.get('/comment/user/:uuidUser/deleted', secureRequest.validateSecureRequest, commentController.getDeletedCommentsByUuidUser);
};

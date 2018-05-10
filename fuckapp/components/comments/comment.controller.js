const commentRepository = require('./comment.repository');

exports.addComment = function(req, res){
    const comment = req.body.comment;

    commentRepository.createComment(comment)
    .then((newComment)=> res.status(200).json({"comment": newComment}))
    .catch((error)=> res.status(500).json({"error": error.message}));
};


exports.modifyComment = function(req, res){
    const comment = req.body.comment;
    const uuidComment = req.params.uuidComment;

    commentRepository.updateComment(uuidComment,comment)
    .then((updateComment)=> res.status(200).json({"comment": updateComment}))
    .catch((error)=> res.status(500).json({"error": error.message}));    
};


exports.deleteComment = function(req, res){    
    const uuidComment = req.params.uuidComment;

    commentRepository.deleteComment(uuidComment)
    .then(()=> res.status(200).json({"message": "comment deleted succesfully"}))
    .catch((error)=> res.status(500).json({"error": error.message}));   
};


exports.getAllComments = function(req, res){
    commentRepository.getAllComments()
    .then((comments)=> res.status(200).json({"comments": comments}))
    .catch((error)=> res.status(500).json({"error": error.message}));   
};


exports.getComment = function(req, res){
    const uuidComment = req.params.uuidComment;

    commentRepository.getCommentByUuid(uuidComment)
    .then((comment)=> res.status(200).json({"comments": comment}))
    .catch((error)=> res.status(500).json({"error": error.message}));   
};


exports.getCommentsByUuidUser = function(req, res){
    const uuidUser = req.params.uuidUser;

    commentRepository.getCommentsByUuidUser(uuidUser)
    .then((comment)=> res.status(200).json({"comments": comment}))
    .catch((error)=> res.status(500).json({"error": error.message})); 
};


exports.getVisibleCommentsByUuidUser = function(req, res){
    const uuidUser = req.params.uuidUser;

    commentRepository.getVisibleCommentsByUuidUser(uuidUser)
    .then((comments)=> res.status(200).json({"comments": comments}))
    .catch((error)=> res.status(500).json({"error": error.message})); 
};

exports.getDeletedCommentsByUuidUser = function(req, res){
    const uuidUser = req.params.uuidUser;

    commentRepository.getDeletedCommentsByUuidUser(uuidUser)
    .then((comments)=> res.status(200).json({"comments": comments}))
    .catch((error)=> res.status(500).json({"error": error.message})); 

};
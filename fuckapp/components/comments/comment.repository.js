'use strict';

const models = require('../../models');
const Comment = models.comment;
const Sequelize = require('../../server').sequelize;


exports.createComment = function(newComment){
    return Comment.create({
        message: newComment.message,
        created_by: newComment.created_by,
        visible: true        
    });
};

exports.getAllComments = function(){
    return Comment.findAll();
};


/**
 * Get Comment filtered by Uuid
 *
 * @param commentUuid comment uuid to for filter
 * @returns {Query|Promise|Promise<Model>|void|*}
 */
exports.getCommentByUuid = function(commentUuid) {
    return  Comment.findOne({
        where: {
            uuid: commentUuid
        }        
    });
};


exports.getCommentsByUuidUser = function(uuidUser) {
    return Comment.findAll({
        where: {
            created_by: uuidUser
        }        
    });
};

exports.getVisibleCommentsByUuidUser = function(uuidUser){
    return Comment.findAll({
        where: {
            created_by:uuidUser,
            visible: true
        }
    });
};

exports.getDeletedCommentsByUuidUser = function(uuidUser){
    return Comment.findAll({
        where: {
            created_by:uuidUser,
            visible: false
        }
    });
};

exports.updateComment = function(uuidComment, comment){        
        return Comment.update({
            message: comment.message,
            visible: comment.visible                      
        }, {
            where: {uuid: uuidComment},
        }
    );      
};


exports.deleteComment = function(uuidComment){        
    return Comment.update({        
        visible: false                  
    }, {
        where: {uuid: uuidComment}
    }
    );      
};


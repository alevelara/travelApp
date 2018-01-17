//Modules
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var messageSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true        
    },
    message: {
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    createdBy:[{
        type: Schema.types.ObjectId, 
        ref:'User',
        required: false
   }],
    createdAt:{
        type: Date,
        required: false
    },
    assingTo:[{
        type: Schema.types.ObjectId, 
        ref:'User',
        required: false
   }],
});

module.exports = mongoose.model('Message',messageSchema);


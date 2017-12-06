var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var placeSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    photo_id:{
        type: mongoose.Schema.Types.ObjectId
    },
    lat:{
        type: Number,
        required: true
    },
    long:{
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    interest_id:[{
        type:mongoose.Schema.Types.ObjectId,
        required: true    
    }]
});

module.exports = mongoose.model('Place', placeSchema);
//Modules
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ratioSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true        
    },
    name: {
        type: String,
        required: true
    },
    photo_ratio_id:{
        type:Schema.Types.ObjectId,
        ref: 'Photo',
        required: false
    },
    points:{
        type: Number,
        required: false
    },
});

module.exports = mongoose.model('Ratio',ratioSchema);


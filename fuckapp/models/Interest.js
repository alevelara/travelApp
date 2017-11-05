var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true,
        default:0
    },
    name: {
        type: String,
        required: true
    },
    photoid:{
        type:Schema.Types.ObjectId,
        ref: 'Photo',
        required: false
    },
    datelog: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Interest', InterestSchema);
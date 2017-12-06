var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var interestSchema = new Schema({
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
    google_types: [{
        type: Schema.Types.ObjectId,
        ref: 'GooglePlacesCategory',
        required: true
    }],
    datelog: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Interest', interestSchema);
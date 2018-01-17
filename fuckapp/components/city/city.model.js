var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var featureSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true,
        default:0
    },
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('City', featureSchema);
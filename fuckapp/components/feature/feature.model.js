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
});

module.exports = mongoose.model('Feature', featureSchema);
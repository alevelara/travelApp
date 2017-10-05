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
    datelog: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Interest', InterestSchema);
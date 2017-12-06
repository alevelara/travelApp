var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var GooglePlacesCategorySchema = new Schema({
    name:{
        type: String,
        required:true
    }
});


module.exports = mongoose.model('GooglePlacesCategory', GooglePlacesCategorySchema);
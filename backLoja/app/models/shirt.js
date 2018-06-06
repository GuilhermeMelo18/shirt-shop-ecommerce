var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ShirtSchema = new Schema({
    clientId: String,
    titleShirt: String,
    modelShirt: String,
    colorShirt: String,
    imgShirt: String,
    imgPicture: String,
    shirtPriceSell: String,
    shirtGainClient : String,
    arrayTags: [String]


});

module.exports = mongoose.model('shirt', ShirtSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ShirtSchema = new Schema({
    clientAuthorId: { type: Schema.Types.ObjectId, ref: 'usuario'},
    titleShirt: String,
    modelShirt: String,
    colorShirt: String,
    imgShirt: String,
    imgPicture: String,
    shirtPriceSell: String,
    shirtGainClient : String,
    arrayTags: [String],
    qtdLikes: String
});

module.exports = mongoose.model('shirt', ShirtSchema);
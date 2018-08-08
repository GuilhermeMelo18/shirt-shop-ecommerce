var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    email: String,
    password: String,
    nameUser: String,
    imageUser: String,
    imageSite: String,
    description: String,
    cep: String,
    totalGain: String,
    totalGainByMoth : [String],
    totalviewsPage : String,
    totalLikesPage: String,
    listBag: [{shirtId: {type: Schema.Types.ObjectId, ref:'shirt'}, statusVenda: Boolean}]

});
 
module.exports = mongoose.model('usuario', UsuarioSchema);
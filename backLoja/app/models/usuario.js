var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    email: String,
    password: String,
    nameUser: String,
    imageUser: String,
    imageSite: String,
    description: String,
    city: String,
    country: String,
    listBag: [{shirtId: {type: Schema.Types.ObjectId, ref:'shirt'}, statusVenda: Boolean}]

});
 
module.exports = mongoose.model('usuario', UsuarioSchema);
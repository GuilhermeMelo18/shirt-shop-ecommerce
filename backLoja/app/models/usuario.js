var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UsuarioSchema = new Schema({
    email: String,
    password: String,
    nameUser: String,
    imageUser: String,
    imageSite: String

});
 
module.exports = mongoose.model('usuario', UsuarioSchema);
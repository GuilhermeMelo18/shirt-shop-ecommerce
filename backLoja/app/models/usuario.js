var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UsuarioSchema = new Schema({
    nome: String,
    email: String,
    senha: String,  
    amigos: [{
        type : Schema.Types.ObjectId, ref: 'usuario'
    }]

});
 
module.exports = mongoose.model('usuario', UsuarioSchema);